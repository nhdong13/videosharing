import React from 'react';
import VideoItem from './VideoItem';
import { useVideos } from '../lib/customHooks';

const Dashboard = () => {
  const { videos } = useVideos();

  return (
    <div className="Dashboard p-4 p-md-16 bg-white-800 h-screen">
      {videos.map((video, index) => <VideoItem key={index} video={video} />)}
    </div>
  );
}

export default Dashboard;
