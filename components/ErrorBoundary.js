// components/ErrorBoundary.js
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for tracking
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo, errorId);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" aria-hidden="true" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-600">
                We're sorry, but an unexpected error occurred. Don't worry, your data is safe.
              </p>
              
              {/* Error ID for support */}
              {this.state.errorId && (
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-medium">Error ID:</span> {this.state.errorId}
                </div>
              )}

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                  <summary className="font-medium text-red-800 cursor-pointer">
                    Debug Information (Development Only)
                  </summary>
                  <div className="mt-2 text-sm text-red-700">
                    <p className="font-medium">Error:</p>
                    <pre className="whitespace-pre-wrap bg-red-100 p-2 rounded mt-1 overflow-x-auto">
                      {this.state.error && this.state.error.toString()}
                    </pre>
                    {this.state.errorInfo && (
                      <>
                        <p className="font-medium mt-3">Component Stack:</p>
                        <pre className="whitespace-pre-wrap bg-red-100 p-2 rounded mt-1 overflow-x-auto text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                aria-label="Try again"
              >
                <RefreshCw className="w-5 h-5 mr-2" aria-hidden="true" />
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                aria-label="Reload page"
              >
                <RefreshCw className="w-5 h-5 mr-2" aria-hidden="true" />
                Reload Page
              </button>

              <Link
                href="/"
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                aria-label="Go to homepage"
              >
                <Home className="w-5 h-5 mr-2" aria-hidden="true" />
                Go Home
              </Link>
            </div>

            {/* Support Link */}
            <div className="text-sm text-gray-500">
              <p>
                If this problem persists, please{' '}
                <Link 
                  href="/contact" // Note: Ensure /contact page exists or update link
                  className="text-indigo-600 hover:text-indigo-500 underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
                >
                  contact our support team
                </Link>
                {this.state.errorId && (
                  <span> and include the error ID above.</span>
                )}
              </p>
            </div>
          </div>

          {/* SEO-friendly fallback content */}
          <div className="sr-only">
            <h2>URLFIRM - Private Link Shortener</h2>
            <p>
              URLFIRM is a privacy-focused URL shortening service that doesn't track users.
              We offer anonymous link shortening without requiring user accounts or collecting personal data.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;