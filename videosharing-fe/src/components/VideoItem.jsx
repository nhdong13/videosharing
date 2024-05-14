import React from 'react';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube';

const VideoItem = (props) => {
  const { video } = props;
  console.log(video);

  function getVideoThumbnail() {
    const url = video.url;
    if (!url) return;
    var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    var match = url.match(regex);
    return match ? match[1] : null;
  }
  return (
    <div className="flex p-5 bg-white lg:w-3/4 w-full md:flex-row flex-col">
      <div className='w-full md:w-1/2'>
        <ReactPlayer url={video.url} width='100%' height='auto' />
      </div>
      <div className="w-full md:w-1/2 mb-4 px-0 md:px-4 p-4 text-left text-sm">
        <p className='text-red-600 text-2xl font-bold'>{video.title}</p>
        <p><strong>Shared by:</strong> {video.user.email}</p>
        <p><strong>Description:</strong> <br /> {video.description}</p>
      </div>
    </div>
  );
}

export default VideoItem;
