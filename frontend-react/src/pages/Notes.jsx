import React from 'react';
import './Notes.css';

const Notes = () => {
  return (
    <div className="notes-container">
      <header className="main-header">
        <h1>CN Laboratory Notes</h1>
        <p className="header-subtitle">Quick Reference and Study Material</p>
      </header>

      <main className="notes-content">
        <section className="notes-section">
          <h2>Study Resources</h2>
          <p>
            Comprehensive notes and study materials for Computer Networks Laboratory.
            These resources complement the practical implementations available in the CN Lab section.
          </p>
        </section>

        <section className="notes-section">
          <h2>Download Notes</h2>
          <div className="notes-grid">
            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Data Link Layer</h3>
              <p>Framing methods, Error detection & correction</p>
              <button className="download-btn">Download PDF</button>
            </div>

            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Network Layer</h3>
              <p>Routing algorithms, IP addressing</p>
              <button className="download-btn">Download PDF</button>
            </div>

            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Transport Layer</h3>
              <p>TCP, UDP, Flow control, Congestion control</p>
              <button className="download-btn">Download PDF</button>
            </div>

            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Application Layer</h3>
              <p>HTTP, DNS, FTP, Email protocols</p>
              <button className="download-btn">Download PDF</button>
            </div>

            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Network Security</h3>
              <p>Encryption, Authentication, Firewalls</p>
              <button className="download-btn">Download PDF</button>
            </div>

            <div className="note-card">
              <div className="note-icon">📄</div>
              <h3>Lab Manual</h3>
              <p>Complete lab guide with all programs</p>
              <button className="download-btn">Download PDF</button>
            </div>
          </div>
        </section>

        <section className="notes-section">
          <h2>Quick References</h2>
          <div className="reference-list">
            <div className="reference-item">
              <h3>🔗 OSI Model</h3>
              <p>7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application</p>
            </div>
            <div className="reference-item">
              <h3>🔗 TCP/IP Model</h3>
              <p>4 layers: Network Access, Internet, Transport, Application</p>
            </div>
            <div className="reference-item">
              <h3>🔗 Common Ports</h3>
              <p>HTTP: 80, HTTPS: 443, FTP: 21, SSH: 22, DNS: 53, SMTP: 25</p>
            </div>
            <div className="reference-item">
              <h3>🔗 IP Classes</h3>
              <p>Class A: 1-126, Class B: 128-191, Class C: 192-223</p>
            </div>
          </div>
        </section>

        <section className="notes-section">
          <h2>Recommended Books</h2>
          <ul className="books-list">
            <li>📚 Computer Networks - Andrew S. Tanenbaum</li>
            <li>📚 Data Communications and Networking - Behrouz A. Forouzan</li>
            <li>📚 Computer Networking: A Top-Down Approach - James Kurose</li>
            <li>📚 TCP/IP Illustrated - W. Richard Stevens</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Notes;
