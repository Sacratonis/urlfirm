// components/FeatureCard.js
import React from 'react';

const FeatureCard = ({
  icon,
  title,
  description,
  bgColorClass = "bg-white",
  borderColorClass = "border-gray-200",
  iconBgClass = "bg-gray-100",
  iconColorClass = "text-gray-600",
  href = null,
  isInteractive = false
}) => {
  const CardContent = () => (
    <div className={`group ${bgColorClass} rounded-2xl p-6 md:p-8 border ${borderColorClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col ${isInteractive ? 'cursor-pointer' : ''} relative`}>
      {/* Icon Container */}
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${iconBgClass} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
        {icon && React.cloneElement(icon, { 
          className: `${iconColorClass} transition-colors duration-300`, 
          size: 28,
          'aria-hidden': true 
        })}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed flex-1 text-base md:text-lg">
          {description}
        </p>

        {/* Interactive indicator */}
        {isInteractive && (
          <div className="mt-4 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm">Learn more</span>
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/30 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );

  // If href is provided, wrap with link
  if (href) {
    return (
      <a 
        href={href}
        className="relative block focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-2xl"
        aria-label={`Learn more about ${title}`}
      >
        <CardContent />
      </a>
    );
  }

  // Regular card
  return (
    <div className="relative">
      <CardContent />
    </div>
  );
};

export default FeatureCard;