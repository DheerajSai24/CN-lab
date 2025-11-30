import React from 'react';

function VideoSection({ title, video, compact = false }) {
  return (
    <div className={`video-section ${compact ? 'compact' : ''}`}>
      <div className="video-header">
        <h3>{title}</h3>
        {video.duration && (
          <span className="video-duration">⏱️ {video.duration}</span>
        )}
      </div>
      
      {video.description && (
        <p className="video-description">{video.description}</p>
      )}
      
      <div className="video-container">
        <iframe
          src={video.embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default VideoSection;
