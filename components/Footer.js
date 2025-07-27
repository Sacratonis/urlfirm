import { Link as LinkIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">URLFirm</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} URLFirm. No cookies. No tracking. Just clean links.
            </p>
            <div className="flex space-x-4 mt-2 justify-center md:justify-end">
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}