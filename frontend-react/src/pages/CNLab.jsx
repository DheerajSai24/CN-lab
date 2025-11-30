import React, { useState, useEffect } from 'react';
import { weeksData, weekVideos, week1ProgramVideos, vivaQuestions } from '../data/weeksData';
import './CNLab.css';

function CNLab() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [cCode, setCCode] = useState('');
  const [compilerOutput, setCompilerOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [lineNumbers, setLineNumbers] = useState('1');
  const [chatMessages, setChatMessages] = useState([{
    isUser: false,
    content: "Hello! I'm your AI assistant. Ask me anything about Computer Networks topics covered in this week!"
  }]);
  const [userInput, setUserInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Auto-scroll chat on new messages
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  const handleCopyCode = async (code) => {
    if (!code || code.trim() === '') {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      
      // Show success feedback
      const copyBtn = document.getElementById('copy-code-btn');
      if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
        
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = originalHTML;
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success feedback
        const copyBtn = document.getElementById('copy-code-btn');
        if (copyBtn) {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
          
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = originalHTML;
          }, 2000);
        }
      } catch (fallbackErr) {
        alert('Failed to copy code. Please copy manually.');
      }
    }
  };

  const handleWeekClick = (weekNum) => {
    setSelectedWeek(weekNum);
    setCurrentProgramIndex(0);
    setShowHomePage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowHomePage(true);
    setSelectedWeek(null);
    setCurrentProgramIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextProgram = () => {
    const week = weeksData[selectedWeek];
    if (week.programs && currentProgramIndex < week.programs.length - 1) {
      setCurrentProgramIndex(currentProgramIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevProgram = () => {
    if (currentProgramIndex > 0) {
      setCurrentProgramIndex(currentProgramIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateLineNumbers();
  }, [cCode]);

  const updateLineNumbers = () => {
    const lines = cCode.split('\n');
    const lineNumbersText = lines.map((_, index) => index + 1).join('\n');
    setLineNumbers(lineNumbersText);
  };

  const handleCodeChange = (e) => {
    setCCode(e.target.value);
  };

  const handleRunCode = async () => {
    if (!cCode.trim()) {
      setCompilerOutput('Please enter some C code to compile.');
      return;
    }

    setIsCompiling(true);
    setCompilerOutput('🔄 Compiling and running your code...');

    try {
      // Try Piston API (free and no auth required)
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'c',
          version: '10.2.0',
          files: [{
            content: cCode
          }]
        })
      });

      const data = await response.json();
      console.log('Piston API Response:', data);
      
      if (data.run) {
        const output = data.run.stdout || data.run.stderr || '(No output)';
        const exitCode = data.run.code;
        
        if (exitCode === 0) {
          setCompilerOutput('✅ Output:\n\n' + output);
        } else {
          setCompilerOutput(`❌ Compilation/Runtime Error (Exit code: ${exitCode}):\n\n${output}`);
        }
      } else if (data.message) {
        setCompilerOutput(`❌ Error: ${data.message}`);
      } else {
        setCompilerOutput(`❌ Unexpected response from compiler.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      console.error('Compiler Error:', error);
      setCompilerOutput(`❌ Unable to compile code.\n\nError: ${error.message}\n\nPlease check your internet connection or try again later.`);
    } finally {
      setIsCompiling(false);
    }
  };



  const handleClearCode = () => {
    setCCode('');
    setCompilerOutput('');
  };

  const GEMINI_API_KEY = 'AIzaSyBMTLCy0sA41V-gd4RRQEQ1Xkc213QGuAk';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const formatAIResponse = (text) => {
    // Replace **bold** with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *italic* with <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Replace numbered lists
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    // Replace bullet points
    text = text.replace(/^[\*\-•]\s+(.+)$/gm, '<li>$1</li>');
    // Wrap consecutive <li> items in <ul>
    text = text.replace(/(<li>.*?<\/li>\s*)+/gs, '<ul>$&</ul>');
    // Replace headers
    text = text.replace(/^###\s+(.+)$/gm, '<h4>$1</h4>');
    text = text.replace(/^##\s+(.+)$/gm, '<h3>$1</h3>');
    // Replace code blocks
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Split into paragraphs
    const paragraphs = text.split('\n\n');
    text = paragraphs.map(p => {
      p = p.trim();
      if (p.startsWith('<ul>') || p.startsWith('<h3>') || p.startsWith('<h4>')) {
        return p;
      }
      return p ? `<p>${p}</p>` : '';
    }).join('');
    return text;
  };

  const askGemini = async (question, retryCount = 0) => {
    const week = weeksData[selectedWeek];
    const contextPrompt = week 
      ? `You are a helpful Computer Networks tutor. The student is studying "${week.title}". Answer their question clearly and concisely. Question: ${question}`
      : `You are a helpful Computer Networks tutor. Answer this question clearly and concisely: ${question}`;
    
    try {
      console.log('Sending request to Gemini API...');
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: contextPrompt
            }]
          }]
        })
      });

      console.log('API Response Status:', response.status);

      if (response.status === 404) {
        return '❌ Model not found. The AI service is temporarily unavailable.';
      }

      if (response.status === 429) {
        const waitTime = retryCount === 0 ? 10000 : 30000; // 10s first retry, 30s second
        if (retryCount < 2) {
          console.log(`Rate limited, waiting ${waitTime/1000}s before retry (attempt ${retryCount + 1})...`);
          return `⏳ Rate limit reached. Retrying in ${waitTime/1000} seconds...\n\nPlease wait, don't send more messages.`;
        }
        return '⏳ API rate limit exceeded. Please wait 2-3 minutes before trying again.\n\n💡 Tip: Try asking fewer questions or wait longer between messages.';
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        return `❌ Error: ${errorData.error?.message || 'API request failed. Please try again in a moment.'}`;
      }
      
      const data = await response.json();
      console.log('API Response Data:', data);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        return text.trim();
      } else {
        console.error('Unexpected response structure:', data);
        return "❌ I received an unexpected response. Please try again.";
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `❌ Network error: ${error.message}. Please check your connection and try again.`;
    }
  };

  const handleSendMessage = async () => {
    const question = userInput.trim();
    if (!question) return;

    // Add user message
    setChatMessages(prev => [...prev, { isUser: true, content: question }]);
    setUserInput('');
    setIsAILoading(true);

    // Auto-scroll to show user message
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);

    // Get AI response
    const response = await askGemini(question);
    
    setIsAILoading(false);
    setChatMessages(prev => [...prev, { isUser: false, content: response }]);

    // Auto-scroll to show AI response
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatWeekExplanation = (text) => {
    const lines = text.split('\n');
    const formatted = [];
    let currentSection = [];
    let sectionType = null;

    lines.forEach((line, index) => {
      if (line.startsWith('**') && line.endsWith(':**')) {
        if (currentSection.length > 0) {
          formatted.push({ type: sectionType, content: currentSection });
          currentSection = [];
        }
        const heading = line.replace(/\*\*/g, '').replace(':', '');
        sectionType = heading.toLowerCase().replace(' ', '-');
        formatted.push({ type: 'heading', content: heading });
      } else if (line.trim()) {
        currentSection.push(line);
      }
    });

    if (currentSection.length > 0) {
      formatted.push({ type: sectionType, content: currentSection });
    }

    return formatted;
  };

  const renderWeekContent = () => {
    const week = weeksData[selectedWeek];
    if (!week) return null;

    // Week 1 has multiple programs
    if (selectedWeek === 1 && week.programs) {
      const program = week.programs[currentProgramIndex];
      return (
        <>
          <h2 id="week-detail-title">Week {selectedWeek}: {week.title}</h2>
          <div className="detail-content">
            <h3>{program.title}</h3>
            <p id="week-detail-explanation">{program.explanation}</p>
            
            {/* Week Overview Explanation */}
            <div className="week-overview">
              {formatWeekExplanation(week.explanation).map((section, idx) => {
                if (section.type === 'heading') {
                  return <h4 key={idx} className="overview-heading">{section.content}</h4>;
                }
                return (
                  <ul key={idx} className={`overview-list ${section.type}`}>
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              })}
            </div>
            
            {program.image && (
              <div className="image-container">
                <img id="week-detail-image" src={program.image} alt={program.title} />
              </div>
            )}

            {/* Video Tutorials Section for Week 1 programs */}
            {week1ProgramVideos[currentProgramIndex] && (
              <div id="video-tutorials-section" className="video-tutorials-section">
                <h3>📹 Video Tutorials</h3>
                <div className="videos-grid">
                  <div className="video-card">
                    <div className="video-wrapper">
                      <iframe 
                        width="560" 
                        height="315" 
                        src={week1ProgramVideos[currentProgramIndex].embedUrl}
                        title={week1ProgramVideos[currentProgramIndex].title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <h4>{week1ProgramVideos[currentProgramIndex].title}</h4>
                      <p>{week1ProgramVideos[currentProgramIndex].description}</p>
                      <div className="video-meta">
                        <span className="duration">⏱️ {week1ProgramVideos[currentProgramIndex].duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="code-container">
              <div className="code-header">
                <h3>C Program</h3>
                <button 
                  id="copy-code-btn" 
                  className="copy-button" 
                  title="Copy code"
                  onClick={() => handleCopyCode(program.code)}
                >
                  <span className="copy-icon">📋</span>
                  <span className="copy-text">Copy</span>
                </button>
              </div>
              <pre><code id="week-detail-code" className="language-c">{program.code}</code></pre>
            </div>

            <div className="output-container">
              <h3>Simulated Output</h3>
              <pre id="week-detail-output">{program.output}</pre>
            </div>

            {/* C Compiler Section */}
            <div className="compiler-container">
              <h3>Online C Compiler</h3>
              <div className="compiler-editor">
                <div className="code-editor-wrapper">
                  <div className="line-numbers" id="line-numbers">{lineNumbers}</div>
                  <textarea 
                    id="c-code-editor" 
                    placeholder="Write your C code here..." 
                    rows="15"
                    value={cCode}
                    onChange={handleCodeChange}
                  ></textarea>
                </div>
              </div>
              <div className="compiler-controls">
                <button 
                  id="run-code-btn" 
                  className="compiler-button"
                  onClick={handleRunCode}
                  disabled={isCompiling}
                >
                  {isCompiling ? 'Running...' : 'Run Code'}
                </button>
                <button 
                  id="clear-code-btn" 
                  className="compiler-button-secondary"
                  onClick={handleClearCode}
                >
                  Clear
                </button>
              </div>
              {compilerOutput && (
                <div id="compiler-output" className={`compiler-output ${compilerOutput.includes('Error') ? 'error' : 'success'}`}>
                  <h4>Output:</h4>
                  <pre id="compiler-result">{compilerOutput}</pre>
                </div>
              )}
            </div>

            {/* Viva Questions Section for Week 1 */}
            {vivaQuestions[1] && (
              <div id="viva-questions-section" className="viva-questions-section">
                <h3>❓ Viva Questions & Answers</h3>
                <div className="viva-questions-container">
                  {vivaQuestions[1].map((item, index) => (
                    <div key={index} className="viva-item">
                      <div className="viva-question">
                        <span className="question-number">Q{index + 1}.</span>
                        <span className="question-text">{item.q}</span>
                      </div>
                      <div className="viva-answer">
                        <span className="answer-label">Answer:</span>
                        <span className="answer-text">{item.a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Chatbot Section */}
            <div id="ai-chatbot-section" className="ai-chatbot-section">
              <h3>🤖 Ask AI Your Doubts</h3>
              <p className="chatbot-description">Have questions about this topic? Ask our AI assistant powered by Google Gemini!</p>
              <div className="chat-container">
                <div id="chat-messages" className="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={msg.isUser ? 'user-message' : 'ai-message'}>
                      <div className="message-avatar">{msg.isUser ? '👤' : '🤖'}</div>
                      <div className="message-content">
                        {msg.isUser ? (
                          <p>{msg.content}</p>
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: formatAIResponse(msg.content) }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input-container">
                  <textarea 
                    id="user-input" 
                    className="chat-input" 
                    placeholder="Type your question here..." 
                    rows="2"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  ></textarea>
                  <button 
                    id="send-btn" 
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={isAILoading}
                  >
                    <span className="send-icon">📤</span>
                    <span className="send-text">Send</span>
                  </button>
                </div>
                {isAILoading && (
                  <div id="chat-loading" className="chat-loading">
                    <div className="loading-spinner"></div>
                    <span>AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sub-program navigation */}
            <div id="sub-program-navigation">
              <h4 id="program-title">{program.title}</h4>
              <div className="program-nav-buttons">
                <button 
                  id="prev-program-btn" 
                  className="animated-button-small"
                  onClick={handlePrevProgram}
                  disabled={currentProgramIndex === 0}
                >
                  &lt; Previous
                </button>
                <button 
                  id="next-program-btn" 
                  className="animated-button-small"
                  onClick={handleNextProgram}
                  disabled={currentProgramIndex === week.programs.length - 1}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      // Other weeks with single program (weeks 2-10)
      const program = week.programs && week.programs[0];
      if (!program) return null;

      return (
        <>
          <h2 id="week-detail-title">Week {selectedWeek}: {week.title}</h2>
          <div className="detail-content">
            <h3>{program.title}</h3>
            <p id="week-detail-explanation">{program.explanation}</p>
            
            {/* Week Overview Explanation */}
            <div className="week-overview">
              {formatWeekExplanation(week.explanation).map((section, idx) => {
                if (section.type === 'heading') {
                  return <h4 key={idx} className="overview-heading">{section.content}</h4>;
                }
                return (
                  <ul key={idx} className={`overview-list ${section.type}`}>
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              })}
            </div>
            
            {week.image && (
              <div className="image-container">
                <img id="week-detail-image" src={week.image} alt={week.title} />
              </div>
            )}

            {/* Video Tutorials Section for other weeks */}
            {selectedWeek !== 1 && weekVideos[selectedWeek] && (
              <div id="video-tutorials-section" className="video-tutorials-section">
                <h3>📹 Video Tutorials</h3>
                <div className="videos-grid">
                  <div className="video-card">
                    <div className="video-wrapper">
                      <iframe 
                        width="560" 
                        height="315" 
                        src={weekVideos[selectedWeek].embedUrl}
                        title={weekVideos[selectedWeek].title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <h4>{weekVideos[selectedWeek].title}</h4>
                      <p>{weekVideos[selectedWeek].description}</p>
                      <div className="video-meta">
                        <span className="duration">⏱️ {weekVideos[selectedWeek].duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="code-container">
              <div className="code-header">
                <h3>{selectedWeek === 10 ? 'Practical Exercise' : 'C Program'}</h3>
                <button 
                  id="copy-code-btn" 
                  className="copy-button" 
                  title="Copy code"
                  onClick={() => handleCopyCode(program.code)}
                >
                  <span className="copy-icon">📋</span>
                  <span className="copy-text">Copy</span>
                </button>
              </div>
              <pre><code id="week-detail-code" className="language-c">{program.code}</code></pre>
            </div>

            {program.output && (
              <div className="output-container">
                <h3>Simulated Output</h3>
                <pre id="week-detail-output">{program.output}</pre>
              </div>
            )}

            {/* C Compiler Section - only for coding weeks */}
            {selectedWeek !== 10 && (
              <div className="compiler-container">
                <h3>Online C Compiler</h3>
                <div className="compiler-editor">
                  <div className="code-editor-wrapper">
                    <div className="line-numbers" id="line-numbers">{lineNumbers}</div>
                    <textarea 
                      id="c-code-editor" 
                      placeholder="Write your C code here..." 
                      rows="15"
                      value={cCode}
                      onChange={handleCodeChange}
                    ></textarea>
                  </div>
                </div>
                <div className="compiler-controls">
                  <button 
                    id="run-code-btn" 
                    className="compiler-button"
                    onClick={handleRunCode}
                    disabled={isCompiling}
                  >
                    {isCompiling ? 'Running...' : 'Run Code'}
                  </button>
                  <button 
                    id="clear-code-btn" 
                    className="compiler-button-secondary"
                    onClick={handleClearCode}
                  >
                    Clear
                  </button>
                </div>
                {compilerOutput && (
                  <div id="compiler-output" className={`compiler-output ${compilerOutput.includes('Error') ? 'error' : 'success'}`}>
                    <h4>Output:</h4>
                    <pre id="compiler-result">{compilerOutput}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Viva Questions Section for other weeks */}
            {vivaQuestions[selectedWeek] && (
              <div id="viva-questions-section" className="viva-questions-section">
                <h3>❓ Viva Questions & Answers</h3>
                <div className="viva-questions-container">
                  {vivaQuestions[selectedWeek].map((item, index) => (
                    <div key={index} className="viva-item">
                      <div className="viva-question">
                        <span className="question-number">Q{index + 1}.</span>
                        <span className="question-text">{item.q}</span>
                      </div>
                      <div className="viva-answer">
                        <span className="answer-label">Answer:</span>
                        <span className="answer-text">{item.a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Chatbot Section */}
            <div id="ai-chatbot-section" className="ai-chatbot-section">
              <h3>🤖 Ask AI Your Doubts</h3>
              <p className="chatbot-description">Have questions about this topic? Ask our AI assistant powered by Google Gemini!</p>
              <div className="chat-container">
                    <div id="chat-messages" className="chat-messages">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={msg.isUser ? 'user-message' : 'ai-message'}>
                          <div className="message-avatar">{msg.isUser ? '👤' : '🤖'}</div>
                          <div className="message-content">
                            {msg.isUser ? (
                              <p>{msg.content}</p>
                            ) : (
                              <div dangerouslySetInnerHTML={{ __html: formatAIResponse(msg.content) }} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="chat-input-container">
                      <textarea 
                        id="user-input" 
                        className="chat-input" 
                        placeholder="Type your question here..." 
                        rows="2"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      ></textarea>
                      <button 
                        id="send-btn" 
                        className="send-button"
                        onClick={handleSendMessage}
                        disabled={isAILoading}
                      >
                        <span className="send-icon">📤</span>
                        <span className="send-text">Send</span>
                      </button>
                    </div>
                    {isAILoading && (
                      <div id="chat-loading" className="chat-loading">
                        <div className="loading-spinner"></div>
                        <span>AI is thinking...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        }
      };

  return (
    <>
      <header className="main-header">
        <h1 id="main-title" className="fade-in">Computer Networks Laboratory</h1>
      </header>

      <main>
        <section id="home-page" className={showHomePage ? 'active' : 'hidden'}>
          <div className="week-cards-grid">
            {Object.keys(weeksData).map((weekNum) => (
              <div
                key={weekNum}
                className="week-card"
                onClick={() => handleWeekClick(parseInt(weekNum))}
              >
                <h3>Week {weekNum}</h3>
                <p>{weeksData[weekNum].title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="week-details-page" className={!showHomePage ? 'active' : 'hidden'}>
          {selectedWeek && renderWeekContent()}
          
          <button id="back-to-home" className="animated-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </section>
      </main>
    </>
  );
}

export default CNLab;
