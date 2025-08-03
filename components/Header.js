// components/Header.js
import React, { useState } from 'react';
import { Menu, X, Shield, HelpCircle } from 'lucide-react'; // Removed LinkIcon import
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Ensure hrefs match actual page paths
  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Privacy', href: '/privacy-policy', icon: Shield },
    { name: 'FAQ', href: '/faq', icon: HelpCircle }, // Ensure /faq exists
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Simple active page check
  const isCurrentPage = (href) => {
    return router.pathname === href;
  };

  const isHomePage = router.pathname === '/';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg group"
            aria-label="URLFIRM Home"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              {/* Replaced LinkIcon with img tag */}
              <img src="/favicon/logo.svg" alt="URLFIRM Logo" className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              URLFIRM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const current = isCurrentPage(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    current
                      ? 'text-indigo-600 bg-indigo-50 font-semibold' // Make active state more prominent
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  aria-current={current ? 'page' : undefined}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" aria-hidden="true" />}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden" role="navigation" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navigation.map((item) => {
                const Icon = item.icon;
                const current = isCurrentPage(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      current
                        ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 font-semibold' // Make active state more prominent
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={current ? 'page' : undefined}
                  >
                    {Icon && <Icon className="w-5 h-5 mr-3" aria-hidden="true" />}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>

      {/* Tagline Section - Only show on home page */}
      {isHomePage && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">
              Private, fast, and zero tracking
            </p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              The only URL shortener that respects your privacy by design — no cookies, no tracking, no data collection.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;