import React, { useState, useCallback } from 'react';
import { Headphones, Sparkles, TrendingUp } from 'lucide-react';
import FileUpload from './components/FileUpload';
import UrlInput from './components/UrlInput';
import ProcessingProgress from './components/ProcessingProgress';
import AudioPlayer from './components/AudioPlayer';
import TranscriptDisplay from './components/TranscriptDisplay';
import SummaryDisplay from './components/SummaryDisplay';
import HighlightsDisplay from './components/HighlightsDisplay';
import ExportTools from './components/ExportTools';
import AdSection from './components/AdSection';
import { PodcastData, ProcessingState } from './types';
import { transcribeAudio, generateSummary, extractHighlights } from './utils/api';

function App() {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    stage: 'idle',
    progress: 0,
    message: 'Ready to process your podcast'
  });

  const processAudio = useCallback(async (audioUrl: string, fileName?: string) => {
    try {
      // Stage 1: Uploading
      setProcessingState({
        stage: 'uploading',
        progress: 10,
        message: 'Preparing audio file...'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Stage 2: Transcribing
      setProcessingState({
        stage: 'transcribing',
        progress: 30,
        message: 'Converting speech to text...'
      });

      const transcript = await transcribeAudio(audioUrl);
      
      setProcessingState({
        stage: 'transcribing',
        progress: 60,
        message: 'Transcript generated successfully'
      });

      // Stage 3: Summarizing
      setProcessingState({
        stage: 'summarizing',
        progress: 75,
        message: 'Analyzing content and generating insights...'
      });

      const [summary, highlights] = await Promise.all([
        generateSummary(transcript),
        extractHighlights(transcript)
      ]);

      // Stage 4: Completed
      setProcessingState({
        stage: 'completed',
        progress: 100,
        message: 'Processing complete!'
      });

      const fullTranscript = transcript.map(segment => segment.text).join(' ');

      setPodcastData({
        episode: {
          id: '1',
          title: fileName || 'Podcast Episode',
          duration: 240,
          audioUrl: audioUrl
        },
        transcript,
        summary,
        highlights,
        fullTranscript
      });

    } catch (error) {
      setProcessingState({
        stage: 'error',
        progress: 0,
        message: 'Processing failed. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    const audioUrl = URL.createObjectURL(file);
    processAudio(audioUrl, file.name);
  }, [processAudio]);

  const handleUrlSubmit = useCallback((url: string) => {
    processAudio(url);
  }, [processAudio]);

  const handleReset = useCallback(() => {
    setPodcastData(null);
    setProcessingState({
      stage: 'idle',
      progress: 0,
      message: 'Ready to process your podcast'
    });
  }, []);

  const isProcessing = processingState.stage !== 'idle' && processingState.stage !== 'completed' && processingState.stage !== 'error';

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-800 rounded-xl flex items-center justify-center shadow-sm">
              <Headphones className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">PodcastSummarizer</h1>
              <p className="text-xs text-neutral-500 font-normal">AI-powered transcription & insights</p>
            </div>
          </div>
          {podcastData && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-medium shadow transition-all duration-200 text-sm"
            >
              New Podcast
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {!podcastData && processingState.stage === 'idle' && (
          <div className="py-6">
            {/* Hero Section with Input */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-blue-500 p-6 rounded-lg shadow-lg">
                  <h1 className="text-4xl font-bold text-white">
                    Transform podcasts into
                    <br />
                    actionable insights
                  </h1>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl shadow-md border border-neutral-200 p-4 backdrop-blur-md">
                <p className="text-sm text-neutral-500 font-normal mb-4">
                  Get AI-generated summaries, key highlights, and full transcripts from any podcast episode.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">Enter Podcast URL</h4>
                    <UrlInput onUrlSubmit={handleUrlSubmit} disabled={isProcessing} />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-neutral-400 font-normal">or</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">Upload Audio File</h4>
                    <FileUpload
                      onFileSelect={handleFileUpload}
                      maxSize={200}
                      accept="audio/*"
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
              <div className="text-center">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Headphones className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Smart Transcription</h3>
                <p className="text-xs text-neutral-500 font-normal">Accurate speech-to-text with speaker identification</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">AI Summaries</h3>
                <p className="text-xs text-neutral-500 font-normal">Concise summaries of long-form content</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Key Highlights</h3>
                <p className="text-xs text-neutral-500 font-normal">Interactive highlights with timestamps</p>
              </div>
            </div>

            {/* Ad Section */}
            <div className="mt-6">
              <AdSection type="sidebar" />
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="py-20">
            <ProcessingProgress state={processingState} />
          </div>
        )}

        {/* Results */}
        {podcastData && processingState.stage === 'completed' && (
          <div className="py-12 space-y-12">
            {/* Audio Player */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6">
                {podcastData.episode.title}
              </h3>
              <AudioPlayer
                audioUrl={podcastData.episode.audioUrl}
                highlights={podcastData.highlights}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Summary */}
                <SummaryDisplay summary={podcastData.summary} />
                
                {/* Highlights */}
                <HighlightsDisplay highlights={podcastData.highlights} />
                
                {/* Transcript */}
                <TranscriptDisplay transcript={podcastData.transcript} />
                
                {/* Export Tools */}
                <ExportTools podcastData={podcastData} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <AdSection type="sidebar" />
                <AdSection type="sponsored" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {processingState.stage === 'error' && (
          <div className="py-20">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Processing Failed</h3>
              <p className="text-gray-600 font-light mb-8">{processingState.message}</p>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-light"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/70 border-t border-neutral-200 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center text-neutral-400 font-normal">
            <p>&copy; 2025 PodcastSummarizer. Powered by <a href="http://darkmatter.is" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-600">Darkmatter</a> for smarter listening.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;