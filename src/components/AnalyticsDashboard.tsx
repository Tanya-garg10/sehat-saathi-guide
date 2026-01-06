// src/components/Analytics.tsx
import React, { useEffect, useState } from 'react';

const Analytics: React.FC = () => {
  const [visitors, setVisitors] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  // Simulate fetching analytics data
  useEffect(() => {
    // Replace this with real API calls if available
    const interval = setInterval(() => {
      setVisitors((prev) => prev + Math.floor(Math.random() * 5));
      setActiveUsers(Math.floor(Math.random() * 20));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 text-sm md:text-base font-medium transition-all">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        📊 Analytics Dashboard
      </h3>
      <div className="flex justify-between mb-1">
        <span>👥 Visitors:</span>
        <span>{visitors}</span>
      </div>
      <div className="flex justify-between">
        <span>🟢 Active Users:</span>
        <span>{activeUsers}</span>
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Updated in real-time
      </div>
    </div>
  );
};

export default Analytics;
