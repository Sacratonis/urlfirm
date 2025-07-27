// components/ResultBox.js
import { useState } from 'react';
import { Copy, Check } from 'lucide-react'; // Removed Trash2, QrCode, Calendar
import CopyButton from './CopyButton';
// import QRCodeDisplay from './QRCodeDisplay'; // Comment out if using pre-generated QR

export default function ResultBox({ result, onCopy }) { // Removed onDelete, onReset props
  const [copied, setCopied] = useState(false);

  if (!result) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  // --- REMOVED: handleDelete function ---

  return (
    // mx-auto centers this box horizontally, w-full ensures it behaves in flex/grid
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto w-full animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Your shortened link is ready!</h2>
      {/* Changed layout back to single column as QR section is removed */}
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
            {/* --- REMOVED: Delete Link Button --- */}
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
        {/* --- REMOVED: QR Code section --- */}
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