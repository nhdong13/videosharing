import React from 'react';
import { useUser } from '../lib/customHooks';

const Dashboard = () => {
  const { user, authenticated } = useUser();
  if (!user || !authenticated) {
    return <div className="p-16 bg-white-800 h-screen">
      <div className="text-2xl mb-4 font-bold">Dashboard</div>
      <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-white" />
    </div>;
  }

  return (
    <div className="p-16 bg-white-800 h-screen">
      <div className="text-2xl mb-4 font-bold">Dashboard </div>
    </div>
  );
}

export default Dashboard;
