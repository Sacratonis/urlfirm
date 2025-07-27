// components/Header.js
import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <LinkIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              URLFirm
            </h1>
          </div>
        </Link>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Private, fast, and zero tracking. Your links — your rules.
        </p>
        <nav className="hidden md:block">
          <ul className="flex justify-center space-x-8">
            <li><Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Privacy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">FAQ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;