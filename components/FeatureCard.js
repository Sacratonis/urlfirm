// components/FeatureCard.js
import React from 'react';

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
    <div className={`${bgColorClass} rounded-2xl p-6 border ${borderColorClass} transition-all duration-300 hover:shadow-lg h-full`}>
      <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center mb-4`}>
        {icon && React.cloneElement(icon, { className: iconColorClass, size: 24 })}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;