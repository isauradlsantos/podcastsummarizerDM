import React, { useCallback, useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSize: number; // in MB
  accept: string;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, maxSize, accept, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    
    const allowedTypes = accept.split(',').map(type => type.trim());
    if (!allowedTypes.some(type => file.type.includes(type.replace('*', '')))) {
      return 'Invalid file type. Please upload an audio file.';
    }
    
    return null;
  };

  const handleFileSelection = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    onFileSelect(file);
  }, [onFileSelect, maxSize, accept]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [handleFileSelection, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [handleFileSelection]);

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragging && !disabled
            ? 'border-purple-400 bg-purple-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${error ? 'bg-red-100' : 'bg-gray-100'}`}>
            {error ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
          
          <div>
            <p className={`text-lg font-light ${error ? 'text-red-700' : 'text-gray-700'}`}>
              {error ? 'Upload Error' : isDragging ? 'Drop your file here' : 'Drop your audio file here'}
            </p>
            <p className={`text-sm font-light ${error ? 'text-red-600' : 'text-gray-500'}`}>
              {error ? error : `or click to browse (max ${maxSize}MB)`}
            </p>
          </div>
        </div>
      </div>
      
      {error && (
        <button
          onClick={() => setError(null)}
          className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center space-x-1 font-light"
        >
          <X className="w-4 h-4" />
          <span>Clear error</span>
        </button>
      )}
    </div>
  );
}