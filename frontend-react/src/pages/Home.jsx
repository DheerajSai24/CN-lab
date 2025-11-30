import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const navigateToNetworks = () => {
    navigate('/cn-lab');
  };

  const navigateToOS = () => {
    alert('Operating Systems laboratory is coming soon! 🚀\n\nWe are working hard to bring you interactive OS experiments. Stay tuned for updates!');
  };

  return (
    <>
      <header className="main-header">
        <h1 id="main-title" className="fade-in">Virtual Laboratory</h1>
        <div className="header-subtitle">Explore Computer Science Subjects Through Interactive Learning</div>
      </header>

      <main>
        <div className="virtual-lab-container">
          <section className="subject-cards-grid">
            {/* Operating Systems Card */}
            <div className="subject-card" onClick={navigateToOS}>
              <div className="status-badge status-coming-soon">Coming Soon</div>
              <div className="subject-card-icon">🖥️</div>
              <h2>Operating Systems</h2>
              <p>Explore fundamental concepts of operating systems including process management, memory allocation, file systems, and system calls through interactive simulations and practical exercises.</p>
              <button className="enter-lab-btn">Enter Lab</button>
            </div>

            {/* Computer Networks Card */}
            <div className="subject-card" onClick={navigateToNetworks}>
              <div className="status-badge status-available">Available</div>
              <div className="subject-card-icon">🌐</div>
              <h2>Computer Networks</h2>
              <p>Dive into networking protocols, data transmission, network topologies, and routing algorithms. Practice with real-world scenarios and network simulation tools.</p>
              <button className="enter-lab-btn">Enter Lab</button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
