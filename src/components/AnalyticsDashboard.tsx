import React, { useState, useEffect } from "react";

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState({
    users: 0,
    visits: 0,
    sales: 0,
  });

  useEffect(() => {
    // Dummy fetch or real API call
    setTimeout(() => {
      setData({
        users: 1200,
        visits: 4500,
        sales: 320,
      });
    }, 500);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl mt-2">{data.users}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Visits</h2>
          <p className="text-4xl mt-2">{data.visits}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-4xl mt-2">{data.sales}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
