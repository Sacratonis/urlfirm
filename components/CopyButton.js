// components/CopyButton.js
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text, onCopy, copied }) {
  return (
    <button
      onClick={onCopy}
      className="ml-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={20} className="text-green-500" />
      ) : (
        <Copy size={20} />
      )}
    </button>
  );
}