import React, { useState } from 'react';

function VivaQuestions({ questions, weekNum, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredQuestions = questions.filter(q =>
    q.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="viva-modal">
      <div className="viva-content">
        <div className="viva-header">
          <h2>Week {weekNum} - Viva Questions</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="viva-search">
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="question-count">
            {filteredQuestions.length} questions
          </span>
        </div>

        <div className="viva-questions-list">
          {filteredQuestions.map((item, index) => (
            <div
              key={index}
              className={`viva-question-item ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="question-header">
                <span className="question-number">Q{index + 1}</span>
                <h4 className="question-text">{item.q}</h4>
                <span className="expand-icon">
                  {expandedIndex === index ? '▼' : '▶'}
                </span>
              </div>
              
              {expandedIndex === index && (
                <div className="answer-content">
                  <strong>Answer:</strong>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VivaQuestions;
