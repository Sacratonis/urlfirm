// components/CopyButton.js
import { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

export default function CopyButton({ text, onCopy, copied, className = "", size = "default" }) {
  const [copyState, setCopyState] = useState('idle'); // idle, copying, success, error
  const [isSupported, setIsSupported] = useState(true);

  // Check clipboard API support
  useEffect(() => {
    setIsSupported(!!navigator.clipboard);
  }, []);

  // Reset copy state after delay
  useEffect(() => {
    if (copyState === 'success' || copyState === 'error') {
      const timer = setTimeout(() => setCopyState('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyState]);

  const handleCopy = async () => {
    if (!text || !isSupported) return;

    setCopyState('copying');
    
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('success');
      if (onCopy) onCopy();
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyState('error');
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyState('success');
        if (onCopy) onCopy();
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        // Stay in 'error' state if fallback also fails
      }
    }
  };

  // Size variants
  const sizeClasses = {
    small: "p-1.5 w-8 h-8",
    default: "p-2 w-10 h-10",
    large: "p-3 w-12 h-12"
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  };

  // Dynamic styling based on state
  const getButtonClasses = () => {
    const baseClasses = `${sizeClasses[size]} rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${className}`;
    
    switch (copyState) {
      case 'copying':
        return `${baseClasses} bg-indigo-100 text-indigo-600 cursor-wait`;
      case 'success':
        return `${baseClasses} bg-green-100 text-green-600 ring-green-500`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-600 ring-red-500`;
      default:
        return `${baseClasses} text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 focus:ring-indigo-500`;
    }
  };

  const getIcon = () => {
    const iconSize = iconSizes[size];
    
    switch (copyState) {
      case 'copying':
        return (
          <div className="animate-spin">
            <Copy size={iconSize} />
          </div>
        );
      case 'success':
        return <Check size={iconSize} className="animate-pulse" />;
      case 'error':
        return <AlertCircle size={iconSize} />;
      default:
        return <Copy size={iconSize} />;
    }
  };

  const getTooltip = () => {
    switch (copyState) {
      case 'copying':
        return 'Copying...';
      case 'success':
        return 'Copied!';
      case 'error':
        return 'Copy failed - try again';
      default:
        return 'Copy to clipboard';
    }
  };

  if (!isSupported) {
    // Provide fallback UI instead of null
    return (
      <button
        disabled
        className={`${sizeClasses[size]} rounded-lg text-gray-400 bg-gray-100 cursor-not-allowed ${className}`}
        title="Copy not supported in this browser"
        aria-label="Copy to clipboard (not supported)"
        type="button"
      >
        <Copy size={iconSizes[size]} />
        <span className="sr-only">Copy functionality not available in your browser.</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copyState === 'copying'}
      className={getButtonClasses()}
      title={getTooltip()}
      aria-label={getTooltip()}
      type="button"
    >
      {getIcon()}
      
      {/* Screen reader feedback */}
      <span className="sr-only">
        {copyState === 'success' ? 'Link copied to clipboard' : 'Copy link to clipboard'}
      </span>
    </button>
  );
}