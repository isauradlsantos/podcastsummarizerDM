import React from 'react';
import { Loader2, Mic, Brain, Sparkles } from 'lucide-react';
import { ProcessingState } from '../types';

interface ProcessingProgressProps {
  state: ProcessingState;
}

export default function ProcessingProgress({ state }: ProcessingProgressProps) {
  const getIcon = () => {
    switch (state.stage) {
      case 'uploading':
        return <Loader2 className="w-12 h-12 animate-spin text-purple-500" />;
      case 'transcribing':
        return <Mic className="w-12 h-12 text-blue-500 animate-pulse" />;
      case 'summarizing':
        return <Brain className="w-12 h-12 text-indigo-500 animate-pulse" />;
      case 'completed':
        return <Sparkles className="w-12 h-12 text-green-500" />;
      default:
        return <Loader2 className="w-12 h-12 animate-spin text-gray-400" />;
    }
  };

  const getStageTitle = () => {
    switch (state.stage) {
      case 'uploading':
        return 'Uploading Audio';
      case 'transcribing':
        return 'Transcribing Speech';
      case 'summarizing':
        return 'Generating Summary';
      case 'completed':
        return 'Processing Complete';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            {getIcon()}
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-light text-gray-900">
            {getStageTitle()}
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 font-light text-lg">
            {state.message}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${state.progress}%` }}
            />
          </div>
          
          {/* Progress Percentage */}
          <p className="text-sm text-gray-400 font-light">
            {Math.round(state.progress)}% complete
          </p>
        </div>
      </div>
    </div>
  );
}