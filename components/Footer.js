// components/Footer.js
import { Link as LinkIcon, Heart, Shield, HelpCircle, FileText, Info } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Corrected hrefs to match actual page paths
  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
    { href: '/terms-of-service', label: 'Terms of Service', icon: FileText },
  ];

  const companyLinks = [
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/faq', label: 'FAQ', icon: HelpCircle }, // Ensure /faq page exists
    // Add Contact if you have a dedicated page, otherwise remove
    // { href: '/contact', label: 'Contact', icon: Mail }, 
  ];

  const features = [
    'No Tracking',
    'No Cookies', 
    'No Account Required',
    'Auto-Delete Links'
  ];

  return (
    <footer className="bg-white border-t border-gray-200 w-full" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg group"
                aria-label="URLFIRM Home"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <LinkIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  URLFIRM
                </span>
              </Link>
              
              <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-md">
                The privacy-first URL shortener. Shorten links without tracking, cookies, or data collection.
              </p>

              {/* Feature Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200"
                  >
                    {/* Consider adding a relevant icon per feature if available */}
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded py-1"
                      >
                        {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded py-1"
                      >
                        {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-600">
              <p className="text-sm">
                © {currentYear} URLFirm. Made with 
              </p>
              <Heart className="w-4 h-4 text-red-500 fill-current" aria-hidden="true" />
              <p className="text-sm">
                for privacy.
              </p>
            </div>

            {/* Privacy Badges */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Tracking</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Cookies</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}