import React, { useState, useCallback } from 'react';
import { Link, AlertCircle, Check } from 'lucide-react';
import { validateAudioUrl } from '../utils/api';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  disabled?: boolean;
}

export default function UrlInput({ onUrlSubmit, disabled }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = useCallback((inputUrl: string) => {
    if (!inputUrl.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }

    if (validateAudioUrl(inputUrl)) {
      setIsValid(true);
      setError(null);
    } else {
      setIsValid(false);
      setError('Please enter a valid podcast RSS feed or direct audio file URL');
    }
  }, []);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    validateUrl(newUrl);
  }, [validateUrl]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && url.trim()) {
      onUrlSubmit(url.trim());
    }
  }, [isValid, url, onUrlSubmit]);

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Link className="w-5 h-5 text-gray-400" />
        </div>
        
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com/podcast.mp3 or RSS feed URL"
          className={`w-full pl-12 pr-12 py-4 border rounded-2xl text-base font-light transition-all duration-300 ${
            isValid === null
              ? 'border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100'
              : isValid
              ? 'border-green-300 focus:border-green-400 focus:ring-4 focus:ring-green-100'
              : 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={disabled}
        />
        
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {isValid === true && (
            <Check className="w-5 h-5 text-green-500" />
          )}
          {isValid === false && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1 font-light">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
      
      <button
        type="submit"
        disabled={!isValid || disabled}
        className="w-full py-4 px-6 bg-gray-900 text-white font-light rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base"
      >
        Process Podcast
      </button>
    </form>
  );
}