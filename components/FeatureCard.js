// components/FeatureCard.js
import React from 'react';

/**
 * FeatureCard Component
 *
 * A reusable card component for displaying features with icons
 *
 * @param {ReactElement} icon - Lucide-react icon component
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @param {string} bgColorClass - Background color classes (default: "bg-white")
 * @param {string} borderColorClass - Border color classes (default: "border-gray-200")
 * @param {string} iconBgClass - Icon background color classes (default: "bg-gray-100")
 * @param {string} iconColorClass - Icon color classes (default: "text-gray-600")
 */
const FeatureCard = ({
  icon,
  title,
  description,
  bgColorClass = "bg-white",
  borderColorClass = "border-gray-200",
  iconBgClass = "bg-gray-100",
  iconColorClass = "text-gray-600"
}) => {
  return (
    <div className={`${bgColorClass} rounded-2xl p-6 border ${borderColorClass} transition-all duration-300 hover:shadow-lg`}>
      <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center mb-4`}>
        {icon && React.cloneElement(icon, { className: iconColorClass, size: 24, 'aria-hidden': "true" })}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;