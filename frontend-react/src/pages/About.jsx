import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="main-header">
        <h1>About CN Laboratory</h1>
        <p className="header-subtitle">Learn Computer Networks Through Practice</p>
      </header>

      <main className="about-content">
        <section className="about-section">
          <h2>About This Platform</h2>
          <p>
            Welcome to the Computer Networks Virtual Laboratory. This platform is designed
            to provide students with comprehensive resources for learning computer networking
            concepts through practical implementations and interactive tools.
          </p>
        </section>

        <section className="about-section">
          <h2>What You'll Learn</h2>
          <div className="topics-grid">
            <div className="topic-item">
              <h3>Week 1: Data Link Layer</h3>
              <p>Character counting, Character stuffing, Bit stuffing</p>
            </div>
            <div className="topic-item">
              <h3>Week 2: Error Detection</h3>
              <p>CRC (Cyclic Redundancy Check) implementation</p>
            </div>
            <div className="topic-item">
              <h3>Week 3: Flow Control</h3>
              <p>Sliding Window Protocol (Go-Back-N)</p>
            </div>
            <div className="topic-item">
              <h3>Week 4: Routing</h3>
              <p>Dijkstra's Shortest Path Algorithm</p>
            </div>
            <div className="topic-item">
              <h3>Week 5: Network Topology</h3>
              <p>Broadcast Tree for Subnets</p>
            </div>
            <div className="topic-item">
              <h3>Week 6: Routing Protocols</h3>
              <p>Distance Vector Routing Algorithm</p>
            </div>
            <div className="topic-item">
              <h3>Week 7: Security</h3>
              <p>Data Encryption and Decryption</p>
            </div>
            <div className="topic-item">
              <h3>Week 8: Congestion Control</h3>
              <p>Leaky Bucket Algorithm</p>
            </div>
            <div className="topic-item">
              <h3>Week 9: Buffer Management</h3>
              <p>Frame Sorting Techniques</p>
            </div>
            <div className="topic-item">
              <h3>Week 10: Network Analysis</h3>
              <p>Packet Capture with Wireshark</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li>✅ 10 comprehensive weeks of networking content</li>
            <li>✅ Video tutorials for each topic</li>
            <li>✅ Interactive C program examples</li>
            <li>✅ Online C compiler to test your code</li>
            <li>✅ 100+ viva questions with detailed answers</li>
            <li>✅ Dark/Light theme for comfortable viewing</li>
            <li>✅ Mobile-responsive design</li>
            <li>✅ User authentication and progress tracking</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Contact & Support</h2>
          <p>
            This platform is developed and maintained for educational purposes.
            For any queries or feedback, please reach out through your institution.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
