import React, { useState } from 'react';
import ProgramViewer from './ProgramViewer';
import VideoSection from './VideoSection';
import VivaQuestions from './VivaQuestions';
import OnlineCompiler from './OnlineCompiler';

function WeekDetail({ 
  weekNum, 
  weekData, 
  weekVideo,
  programVideos, 
  vivaQuestions, 
  onBack,
  isCompleted,
  onToggleComplete 
}) {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showViva, setShowViva] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);

  return (
    <div className="week-detail-container">
      <div className="week-detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Weeks
        </button>
        
        <div className="week-header-content">
          <div className="week-header-top">
            <h1>Week {weekNum}: {weekData.title}</h1>
            <button
              className={`complete-toggle ${isCompleted ? 'completed' : ''}`}
              onClick={() => onToggleComplete(weekNum)}
            >
              {isCompleted ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
          
          {weekData.image && (
            <div className="week-image">
              <img src={weekData.image} alt={weekData.title} />
            </div>
          )}
          
          <div className="week-explanation">
            <h2>Overview</h2>
            <p>{weekData.explanation}</p>
          </div>
        </div>
      </div>

      {/* Week Video Section */}
      {weekVideo && (
        <VideoSection
          title={`Week ${weekNum} Lecture`}
          video={weekVideo}
        />
      )}

      {/* Programs Section */}
      <div className="programs-section">
        <h2>Programs</h2>
        <div className="programs-grid">
          {weekData.programs && weekData.programs.map((program, index) => (
            <div
              key={index}
              className={`program-card ${selectedProgram === index ? 'active' : ''}`}
              onClick={() => setSelectedProgram(selectedProgram === index ? null : index)}
            >
              <h3>{program.title}</h3>
              <p className="program-excerpt">
                {program.explanation.substring(0, 80)}...
              </p>
              <span className="expand-indicator">
                {selectedProgram === index ? '▼ Hide' : '▶ View'}
              </span>
            </div>
          ))}
        </div>

        {selectedProgram !== null && (
          <ProgramViewer
            program={weekData.programs[selectedProgram]}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </div>

      {/* Program Videos (Week 1 only) */}
      {programVideos && (
        <div className="program-videos-section">
          <h2>Program Video Tutorials</h2>
          <div className="videos-grid">
            {programVideos.map((video, index) => (
              <VideoSection
                key={index}
                title={video.title}
                video={video}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="week-actions">
        <button 
          className="action-button compiler-btn"
          onClick={() => setShowCompiler(!showCompiler)}
        >
          💻 Online C Compiler
        </button>
        
        <button 
          className="action-button viva-btn"
          onClick={() => setShowViva(!showViva)}
        >
          📚 Viva Questions
        </button>
      </div>

      {/* Online Compiler */}
      {showCompiler && (
        <OnlineCompiler onClose={() => setShowCompiler(false)} />
      )}

      {/* Viva Questions */}
      {showViva && vivaQuestions && (
        <VivaQuestions
          questions={vivaQuestions}
          weekNum={weekNum}
          onClose={() => setShowViva(false)}
        />
      )}
    </div>
  );
}

export default WeekDetail;
