import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center transform hover:scale-105 transition-transform duration-300">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-white text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  </div>
);

export default StatCard;