import React, { useState } from 'react';

function ProgramViewer({ program, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(program.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = program.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="program-viewer">
      <div className="program-viewer-header">
        <h3>{program.title}</h3>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>

      <div className="program-explanation">
        <h4>Explanation</h4>
        <p>{program.explanation}</p>
      </div>

      <div className="program-code-section">
        <div className="code-header">
          <h4>Source Code</h4>
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
        <pre className="code-block">
          <code>{program.code}</code>
        </pre>
      </div>

      {program.output && (
        <div className="program-output-section">
          <h4>Expected Output</h4>
          <pre className="output-block">
            <code>{program.output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default ProgramViewer;
