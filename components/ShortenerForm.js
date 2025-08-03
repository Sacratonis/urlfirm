// components/ShortenerForm.js
import { useState, useRef, useEffect } from 'react';
import { Link2, Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function ShortenerForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [errors, setErrors] = useState({});
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [aliasAvailable, setAliasAvailable] = useState(null); // null = not checked, true/false = checked
  const [aliasCheckLoading, setAliasCheckLoading] = useState(false); // For showing loading state during alias check
  const [showAdvanced, setShowAdvanced] = useState(false);
  const urlInputRef = useRef(null);
  const aliasInputRef = useRef(null);
  const aliasCheckTimeoutRef = useRef(null); // Ref to store the timeout ID

  // Auto-focus URL input on mount
  useEffect(() => {
    if (urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, []);

  // URL validation
  const validateUrl = (urlString) => {
    if (!urlString.trim()) return false;
    try {
      const url = new URL(urlString);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  };

  // Real-time URL validation
  useEffect(() => {
    const isValid = validateUrl(url);
    setIsValidUrl(isValid);
    if (url && !isValid) {
      setErrors(prev => ({ 
        ...prev, 
        url: 'Please enter a valid URL (must start with http:// or https://)' 
      }));
    } else {
      setErrors(prev => ({ ...prev, url: null }));
    }
  }, [url]);

  // Alias validation (format only)
  const validateAlias = (aliasString) => {
    if (!aliasString) return true; // Optional field
    const aliasRegex = /^[a-z0-9-]+$/;
    return aliasRegex.test(aliasString) && 
           aliasString.length >= 3 && 
           aliasString.length <= 30 &&
           !aliasString.startsWith('-') && 
           !aliasString.endsWith('-');
  };

  // Function to check alias availability (simulated API call)
  const checkAliasAvailability = async (aliasToCheck) => {
    if (!aliasToCheck || !validateAlias(aliasToCheck)) {
      return; // Don't check if invalid
    }

    setAliasCheckLoading(true);
    setAliasAvailable(null); // Reset previous state

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch('/api/check-alias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: aliasToCheck }),
      });

      if (!response.ok) {
        throw new Error('Failed to check alias');
      }

      const data = await response.json();
      setAliasAvailable(data.available); // Expect { available: true/false } from API
    } catch (err) {
      console.error('Alias check failed:', err);
      setAliasAvailable(false); // Assume unavailable on error for safety
    } finally {
      setAliasCheckLoading(false);
    }
  };

  // Debounced alias availability check
  useEffect(() => {
    if (alias) {
      const isValid = validateAlias(alias);
      if (!isValid) {
        setErrors(prev => ({ 
          ...prev, 
          alias: 'Alias must be 3-30 characters, lowercase letters, numbers, and hyphens only' 
        }));
        setAliasAvailable(null);
        setAliasCheckLoading(false);
        // Clear any pending check
        if (aliasCheckTimeoutRef.current) {
          clearTimeout(aliasCheckTimeoutRef.current);
        }
      } else {
        setErrors(prev => ({ ...prev, alias: null }));
        // Clear any pending check
        if (aliasCheckTimeoutRef.current) {
          clearTimeout(aliasCheckTimeoutRef.current);
        }
        // Debounce the API call
        aliasCheckTimeoutRef.current = setTimeout(() => {
          checkAliasAvailability(alias);
        }, 500); // 500ms delay
      }
    } else {
      setErrors(prev => ({ ...prev, alias: null }));
      setAliasAvailable(null);
      setAliasCheckLoading(false);
      // Clear any pending check
      if (aliasCheckTimeoutRef.current) {
        clearTimeout(aliasCheckTimeoutRef.current);
      }
    }

    // Cleanup timeout on unmount or alias change
    return () => {
      if (aliasCheckTimeoutRef.current) {
        clearTimeout(aliasCheckTimeoutRef.current);
      }
    };
  }, [alias]);

  const handleUrlChange = (e) => {
    let value = e.target.value;
    // Improved auto-add https:// logic
    if (value && !value.match(/^https?:\/\//i)) {
      // Only auto-add if it looks like a domain (contains a dot and no obvious typo)
      const trimmedValue = value.trim();
      if (trimmedValue.includes('.') && 
          !['h', 'ht', 'htt', 'http', 'https', 'https:'].includes(trimmedValue) &&
          !trimmedValue.startsWith('http')) {
        value = 'https://' + value;
      }
    }
    setUrl(value);
  };

  const handleAliasChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setAlias(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation
    const newErrors = {};
    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!validateUrl(url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    if (alias && !validateAlias(alias)) {
      newErrors.alias = 'Invalid alias format';
    }
    // Check if alias is available if one was entered
    if (alias && aliasAvailable === false) {
        newErrors.alias = 'This alias is already taken. Please choose another.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Submit form
    onSubmit({ longUrl: url.trim(), customAlias: alias.trim() || null });
  };

  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (validateUrl(text)) {
        setUrl(text);
        setShowAdvanced(true); // Show advanced options after pasting
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      // Optionally show user feedback
    }
  };

  const generateRandomAlias = () => {
    const adjectives = ['quick', 'smart', 'cool', 'fast', 'neat', 'nice', 'easy'];
    const nouns = ['link', 'url', 'short', 'click', 'jump', 'go', 'hop'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 999);
    setAlias(`${randomAdj}-${randomNoun}-${randomNum}`);
    setShowAdvanced(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto w-full border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Shorten Your Link
        </h2>
        <p className="text-gray-600">
          Paste your long URL below and get a private, trackless short link instantly
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-left text-sm font-semibold text-gray-900 mb-3">
            Enter your URL *
          </label>
          <div className="relative">
            <input
              ref={urlInputRef}
              type="url"
              id="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com/your-very-long-link-here"
              className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                errors.url 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : isValidUrl
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              disabled={loading}
              aria-describedby={errors.url ? 'url-error' : 'url-help'}
            />
            {/* URL Status Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isValidUrl && <CheckCircle className="w-6 h-6 text-green-500" />}
              {errors.url && <AlertCircle className="w-6 h-6 text-red-500" />}
            </div>
          </div>
          {/* URL Helper/Error */}
          {errors.url ? (
            <p id="url-error" className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.url}
            </p>
          ) : (
            <div className="mt-2 flex items-center justify-between">
              <p id="url-help" className="text-sm text-gray-500">
                {isValidUrl ? '✓ Valid URL detected' : 'Enter a complete URL starting with https://'}
              </p>
              <button
                type="button"
                onClick={handlePasteUrl}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium focus:outline-none focus:underline"
              >
                Paste from clipboard
              </button>
            </div>
          )}
        </div>
        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </button>
          {!showAdvanced && (
            <button
              type="button"
              onClick={generateRandomAlias}
              className="text-sm text-gray-600 hover:text-gray-700 focus:outline-none focus:underline"
            >
              Generate custom alias
            </button>
          )}
        </div>
        {/* Advanced Options */}
        {showAdvanced && (
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 animate-slide-down">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Custom Alias</h3>
            </div>
            <div>
              <label htmlFor="alias" className="block text-left text-sm font-medium text-gray-700 mb-2">
                Custom short link (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">urlfirm.com/</span>
                </div>
                <input
                  ref={aliasInputRef}
                  type="text"
                  id="alias"
                  value={alias}
                  onChange={handleAliasChange}
                  placeholder="my-custom-link"
                  className={`w-full pl-32 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                    errors.alias 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : aliasAvailable === true
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : aliasAvailable === false
                          ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500'
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                  disabled={loading || aliasCheckLoading}
                  maxLength={30}
                  aria-describedby={errors.alias ? 'alias-error' : (aliasAvailable === false ? 'alias-unavailable' : 'alias-help')}
                />
                {/* Alias Status Icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {aliasCheckLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                  ) : aliasAvailable === true ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : aliasAvailable === false ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  ) : errors.alias ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : null}
                </div>
              </div>
              {/* Alias Helper/Error/Availability */}
              {errors.alias ? (
                <p id="alias-error" className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.alias}
                </p>
              ) : aliasAvailable === false ? (
                <p id="alias-unavailable" className="mt-2 text-sm text-yellow-600 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  This alias is already taken - try another one
                </p>
              ) : (
                <div className="mt-2">
                  <p id="alias-help" className="text-xs text-gray-500 mb-2">
                    3-30 characters • lowercase letters, numbers, hyphens only
                  </p>
                  {aliasAvailable === true && (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Great! This alias is available
                    </p>
                  )}
                </div>
              )}
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={generateRandomAlias}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Generate Random
                </button>
                <button
                  type="button"
                  onClick={() => setAlias('')}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isValidUrl || errors.url || errors.alias || (alias && aliasAvailable === false) || aliasCheckLoading}
          className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center text-lg ${
            loading || aliasCheckLoading
              ? 'bg-gray-400 text-white scale-95' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105 focus:ring-indigo-500 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading || aliasCheckLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {aliasCheckLoading ? 'Checking alias...' : 'Creating your private link...'}
            </>
          ) : (
            <>
              <Link2 className="w-6 h-6 mr-2" />
              Shorten My Link
            </>
          )}
        </button>
      </form>
      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              100% Private & Anonymous
            </p>
            <p className="text-xs text-blue-600">
              No tracking, no cookies, no data collection. Your link will auto-expire in 7 days for maximum privacy.
            </p>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
            max-height: 300px;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}