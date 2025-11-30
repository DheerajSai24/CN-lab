import React from 'react';

function WeekCard({ weekNum, weekData, isCompleted, onWeekClick, onToggleComplete }) {
  return (
    <div 
      className={`week-card ${isCompleted ? 'completed' : ''}`}
      onClick={() => onWeekClick(weekNum)}
    >
      <div className="week-card-header">
        <div className="week-number">Week {weekNum}</div>
        <button
          className="complete-checkbox"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(weekNum);
          }}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted && <span className="checkmark">✓</span>}
        </button>
      </div>
      
      <h3 className="week-title">{weekData.title}</h3>
      
      <div className="week-meta">
        <span className="program-count">
          📝 {weekData.programs ? weekData.programs.length : 0} Programs
        </span>
        {weekNum === 1 && (
          <span className="video-badge">🎥 Videos</span>
        )}
      </div>
      
      <p className="week-excerpt">
        {weekData.explanation.substring(0, 100)}...
      </p>
      
      <div className="week-card-footer">
        <span className="view-details">View Details →</span>
      </div>
    </div>
  );
}

export default WeekCard;
