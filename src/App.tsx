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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">
                  PodcastSummarizer
                </h1>
                <p className="text-sm text-gray-500 font-light">AI-powered transcription & insights</p>
              </div>
            </div>
            
            {podcastData && (
              <button
                onClick={handleReset}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-light transition-colors duration-300"
              >
                New Podcast
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {!podcastData && processingState.stage === 'idle' && (
          <div className="py-20">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl mx-auto flex items-center justify-center mb-8">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
                Transform podcasts into
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  actionable insights
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                Get AI-generated summaries, key highlights, and full transcripts from any podcast episode. 
                Perfect for busy professionals who want to stay informed.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-12 mb-20 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Headphones className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Smart Transcription</h3>
                <p className="text-gray-600 font-light leading-relaxed">Accurate speech-to-text with speaker identification and timestamps</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">AI Summaries</h3>
                <p className="text-gray-600 font-light leading-relaxed">Concise summaries that capture the essence of long-form content</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Highlights</h3>
                <p className="text-gray-600 font-light leading-relaxed">Interactive highlights with timestamps for quick navigation</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
                <div className="space-y-10">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-6">Enter Podcast URL</h4>
                    <UrlInput onUrlSubmit={handleUrlSubmit} disabled={isProcessing} />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-400 font-light">or</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-6">Upload Audio File</h4>
                    <FileUpload
                      onFileSelect={handleFileUpload}
                      maxSize={200}
                      accept="audio/*"
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>

              {/* Ad Section */}
              <div className="mt-12">
                <AdSection type="sidebar" />
              </div>
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
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center text-gray-500 font-light">
            <p>&copy; 2025 PodcastSummarizer. Powered by AI for smarter listening.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;