import React from 'react';
import { Star, Clock, Play } from 'lucide-react';
import { Highlight } from '../types';

interface HighlightsDisplayProps {
  highlights: Highlight[];
  onHighlightClick?: (timestamp: number) => void;
}

export default function HighlightsDisplay({ highlights, onHighlightClick }: HighlightsDisplayProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-900">Key Highlights</h3>
      </div>

      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div
            key={highlight.id}
            className="group border border-gray-100 rounded-2xl p-6 hover:border-yellow-200 hover:bg-yellow-50 transition-all duration-300 cursor-pointer"
            onClick={() => onHighlightClick?.(highlight.timestamp)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center space-x-1 font-light">
                    <Clock className="w-3 h-3" />
                    <span>{highlight.formattedTime}</span>
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-3 group-hover:text-yellow-800 transition-colors duration-300">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <Play className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {highlights.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="font-light">No highlights available for this episode.</p>
        </div>
      )}
    </div>
  );
}