import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Highlight } from '../types';
import { formatTime } from '../utils/api';

interface AudioPlayerProps {
  audioUrl: string;
  highlights: Highlight[];
}

export default function AudioPlayer({ audioUrl, highlights }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  // Generate mock waveform data
  useEffect(() => {
    const generateWaveform = () => {
      const data = [];
      for (let i = 0; i < 200; i++) {
        data.push(Math.random() * 0.8 + 0.1);
      }
      setWaveformData(data);
    };
    generateWaveform();
  }, []);

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveformData.length;
    const progressWidth = duration > 0 ? (currentTime / duration) * width : 0;

    waveformData.forEach((amplitude, index) => {
      const x = index * barWidth;
      const barHeight = amplitude * height * 0.7;
      const y = (height - barHeight) / 2;

      // Gradient for played portion
      if (x < progressWidth) {
        ctx.fillStyle = '#8B5CF6';
      } else {
        ctx.fillStyle = '#E5E7EB';
      }

      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });

    // Draw highlight markers
    highlights.forEach(highlight => {
      if (duration > 0) {
        const x = (highlight.timestamp / duration) * width;
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(x - 1, 0, 2, height);
      }
    });
  }, [waveformData, currentTime, duration, highlights]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const skipTime = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
  }, [duration]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const jumpToHighlight = useCallback((timestamp: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timestamp;
    setCurrentTime(timestamp);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="space-y-6">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Waveform */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={80}
          className="w-full h-16 cursor-pointer rounded-2xl bg-gray-50 border border-gray-100"
          onClick={handleSeek}
        />
        
        {/* Time indicators */}
        <div className="flex justify-between text-xs text-gray-400 mt-2 font-light">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => skipTime(-10)}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-300"
            title="Skip back 10s"
          >
            <SkipBack className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl transition-colors duration-300"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={() => skipTime(10)}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-colors duration-300"
            title="Skip forward 10s"
          >
            <SkipForward className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-gray-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Quick Jump to Highlights */}
      {highlights.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Quick Jump to Highlights:</h4>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <button
                key={highlight.id}
                onClick={() => jumpToHighlight(highlight.timestamp)}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full text-xs font-light transition-colors duration-300"
              >
                {highlight.formattedTime} - {highlight.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}