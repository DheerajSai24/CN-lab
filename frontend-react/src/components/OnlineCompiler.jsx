import React from 'react';

function OnlineCompiler({ onClose }) {
  return (
    <div className="compiler-modal">
      <div className="compiler-content">
        <div className="compiler-header">
          <h2>💻 Online C Compiler</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="compiler-info">
          <p>
            Test your programs in the embedded online compiler below. 
            Copy code from the program sections and run it directly!
          </p>
        </div>

        <div className="compiler-container">
          <iframe
            src="https://www.programiz.com/c-programming/online-compiler/"
            title="Online C Compiler"
            className="compiler-iframe"
            frameBorder="0"
          />
        </div>

        <div className="compiler-tips">
          <h3>Quick Tips:</h3>
          <ul>
            <li>📋 Use the copy button on programs to quickly copy code</li>
            <li>▶️ Click "Run" in the compiler to execute your code</li>
            <li>🔧 Modify programs to experiment and learn</li>
            <li>💾 The compiler supports standard C libraries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OnlineCompiler;
