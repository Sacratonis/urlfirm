// components/ResultBox.js
import { useState, useEffect, useRef } from 'react';
import { Copy, Check, ExternalLink, Eye, Clock, Shield, Download } from 'lucide-react';
import CopyButton from './CopyButton';

export default function ResultBox({ result, onCopy }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const resultRef = useRef(null);

  // Auto-scroll when result appears
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }, 150);
    }
  }, [result]);

  // Reset states when new result comes in
  useEffect(() => {
    if (result) {
      setCopied(false);
      setShowDetails(false);
    }
  }, [result]);

  if (!result) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
      // Optionally, show an error message to the user
    }
  };

  const handleVisitLink = () => {
    window.open(result.shortUrl, '_blank', 'noopener,noreferrer');
  };

  // Format expiry date
  const formatExpiryDate = () => {
    if (!result.expiresAt) return 'In 7 days';
    const date = new Date(result.expiresAt);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      ref={resultRef}
      className="mt-8 bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-3xl mx-auto w-full animate-slide-up"
    >
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-3xl px-6 md:px-8 py-4 border-b border-green-100">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
          </div>
          <div className="text-center">
            <p className="text-green-800 font-semibold">Link shortened successfully!</p>
            <p className="text-green-600 text-sm">Your private short link is ready to use</p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 md:p-8">
        {/* Short URL Display */}
        <div className="mb-6">
          <label htmlFor="short-url-input" className="block text-sm font-medium text-gray-700 mb-3">
            Your shortened link:
          </label>
          <div className="relative group">
            <div className="flex items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-xl border-2 border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-20">
              <input
                id="short-url-input" // Add ID for label association
                type="text"
                value={result.shortUrl}
                readOnly
                className="flex-1 bg-transparent px-4 py-4 text-lg font-mono text-indigo-600 focus:outline-none selection:bg-indigo-100"
                aria-label="Shortened URL"
              />
              <div className="flex items-center space-x-2 px-4">
                <CopyButton 
                  text={result.shortUrl} 
                  onCopy={handleCopy} 
                  copied={copied}
                  size="default"
                />
                <button
                  onClick={handleVisitLink}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title="Visit link in new tab"
                  aria-label="Visit link in new tab"
                >
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleCopy}
            className={`flex items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              copied 
                ? 'bg-green-100 text-green-700 ring-green-500' 
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 ring-indigo-500'
            }`}
          >
            {copied ? (
              <>
                <Check size={18} className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} className="mr-2" />
                Copy Link
              </>
            )}
          </button>
          <button
            onClick={handleVisitLink}
            className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ExternalLink size={18} className="mr-2" />
            Visit Link
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center px-4 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-expanded={showDetails}
          >
            <Eye size={18} className="mr-2" />
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
        {/* Expanded Details */}
        {showDetails && (
          <div className="space-y-4 animate-slide-down">
            {/* Privacy Features */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                Privacy Protection Active
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  No IP tracking
                </div>
                <div className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  No cookies used
                </div>
                <div className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  No data stored
                </div>
              </div>
            </div>
            {/* Link Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Expiry Info */}
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Auto-Expiry</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  Link expires: <span className="font-medium">{formatExpiryDate()}</span>
                </p>
                <p className="text-yellow-600 text-xs mt-1">
                  Automatically deleted for your privacy
                </p>
              </div>
              {/* Delete Token */}
              {result.deleteToken && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="flex items-center mb-2">
                    <Download className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-medium text-red-800">Management Code</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono text-red-700 bg-red-100 px-2 py-1 rounded">
                      {result.deleteToken}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.deleteToken)}
                      className="ml-2 p-1 text-red-600 hover:text-red-700 transition-colors"
                      title="Copy management code"
                      aria-label="Copy management code"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-red-600 text-xs mt-1">
                    Save this code for link management
                  </p>
                </div>
              )}
            </div>
            {/* Original URL (if provided and different) */}
            {/* Note: result.originalUrl is not passed from the API or form, so this block might not render */}
            {result.originalUrl && result.originalUrl !== result.shortUrl && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Original URL:</h4>
                <p className="text-sm text-gray-600 break-all font-mono bg-white px-3 py-2 rounded border">
                  {result.originalUrl}
                </p>
              </div>
            )}
          </div>
        )}
        {/* Tips Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Tip
            </h4>
            <p className="text-blue-800 text-sm">
              Your link was created without any tracking or data collection. 
              We don't know who created it or when it's used. It will automatically 
              expire in 7 days to protect your privacy.
            </p>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
            max-height: 0;
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
            max-height: 500px;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}