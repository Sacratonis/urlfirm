// components/ResultBox.js
import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import CopyButton from './CopyButton';

export default function ResultBox({ result, onCopy }) {
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  // Auto-scroll when result appears
  useEffect(() => {
    if (result && resultRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [result]);

  if (!result) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={resultRef}
      className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto w-full animate-fade-in border-2 border-green-200"
    >
      {/* Success indicator */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-2 text-green-600">
          <Check size={20} />
          <span className="text-sm font-medium">Link created successfully!</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Your shortened link is ready!</h2>
      
      <div className="flex flex-col gap-8">
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium break-all hover:underline"
              >
                {result.shortUrl}
              </a>
              <CopyButton text={result.shortUrl} onCopy={handleCopy} copied={copied} />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleCopy}
              className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              {copied ? <Check size={20} className="mr-2 text-green-500" /> : <Copy size={20} className="mr-2" />}
              Copy Link
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Save this code:</span> {result.deleteToken}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Used internally for link management.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}