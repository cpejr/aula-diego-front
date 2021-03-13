import React from 'react';
import './VideoFrame.css'


const VideoFrame = (props) => {

  const url = props.url.match(/(?<=\?v=).+/g)

  return (
    
    <div className="video-Wrapper">
      <iframe
        src={"https://www.youtube.com/embed/" + url}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  );
};

export default VideoFrame;