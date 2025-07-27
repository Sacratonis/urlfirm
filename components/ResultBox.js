// components/ResultBox.js
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import CopyButton from './CopyButton';

export default function ResultBox({ result, onCopy }) {
  const [copied, setCopied] = useState(false);

  // Check if result exists before trying to access its properties
  if (!result) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    if (onCopy) onCopy(); // Notify parent component
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Your shortened link is ready!</h2>
      <div className="flex flex-col md:flex-row gap-8">
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
              {copied ? <Check size={20} className="mr-2 text-green-500" aria-hidden="true" /> : <Copy size={20} className="mr-2" aria-hidden="true" />}
              Copy Link
            </button>
            {/* Delete Button Removed */}
          </div>
          {/* Delete Token Display Removed */}
          {/* QR Code Section Removed */}
        </div>
        {/* QR Code Section Removed */}
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