import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Clock } from 'lucide-react';
import { TranscriptSegment } from '../types';
import { formatTime } from '../utils/api';

interface TranscriptDisplayProps {
  transcript: TranscriptSegment[];
}

export default function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTranscript = transcript.filter(segment =>
    segment.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Full Transcript</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-xl transition-colors duration-300 font-light"
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div>
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 font-light"
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-50">
            {filteredTranscript.map((segment) => (
              <div key={segment.id} className="p-6 hover:bg-gray-50 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-light">
                        {formatTime(segment.startTime)}
                      </span>
                      {segment.speaker && (
                        <span className="flex items-center space-x-1 font-light">
                          <User className="w-3 h-3" />
                          <span>{segment.speaker}</span>
                        </span>
                      )}
                      {segment.confidence && (
                        <span className="text-gray-400 font-light">
                          {Math.round(segment.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-light leading-relaxed">
                      {highlightText(segment.text, searchTerm)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isExpanded && (
        <div className="p-8 bg-gray-50">
          <p className="text-gray-500 text-center font-light">
            Click "Expand" to view the full transcript with timestamps and search functionality.
          </p>
        </div>
      )}
    </div>
  );
}