import React from 'react';
import './VideoFrame.css'


const VideoFrame = (src) => {

  return (
    
    <div className="video-Wrapper">
      <iframe
        src={src.url}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  );
};

export default VideoFrame;