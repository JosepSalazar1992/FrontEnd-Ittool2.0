import React from 'react';
import './App.css';

function OnePage() {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  console.log('Código recibido:', code);
  return (
    <div className="App">
      {/* Navegación */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Sección de inicio */}
      <section id="home" className="section">
        <h1>Welcome to One Page Template</h1>
        <p>This is a simple one-page template built with React.</p>
      </section>

      {/* Sección de características */}
      <section id="features" className="section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Feature 1</h3>
            <p>Detail about feature 1.</p>
          </div>
          <div className="feature">
            <h3>Feature 2</h3>
            <p>Detail about feature 2.</p>
          </div>
          <div className="feature">
            <h3>Feature 3</h3>
            <p>Detail about feature 3.</p>
          </div>
        </div>
      </section>

      {/* Sección sobre nosotros */}
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>Information about your company or product.</p>
      </section>

      {/* Sección de contacto */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1234567890</p>
      </section>

      {/* Pie de página */}
      <footer className="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default OnePage;
