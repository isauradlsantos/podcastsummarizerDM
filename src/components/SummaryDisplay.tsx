import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { Summary } from '../types';

interface SummaryDisplayProps {
  summary: Summary;
}

export default function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-900">Episode Summary</h3>
        <span className="text-sm text-gray-400 font-light">({summary.wordCount} words)</span>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
          <h4 className="font-medium text-gray-900 mb-4">Overview</h4>
          <p className="text-gray-700 font-light leading-relaxed text-lg">{summary.overview}</p>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="font-medium text-gray-900 mb-6 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Key Takeaways</span>
          </h4>
          <ul className="space-y-4">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-light leading-relaxed pt-1">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}