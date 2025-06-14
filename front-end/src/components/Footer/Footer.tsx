import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // ensures cookies/session are sent
      });

      if (response.ok) {
        window.location.href = '/login'; // redirect to login after logout
      } else {
        console.error('Erreur de déconnexion');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la déconnexion', error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-section logo">LOGO</div>

      <div className="footer-section links">
        <a href="/cgu">CGU</a>
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        <a href="/plan-du-site">Plan du site</a>
      </div>

      <div className="footer-section logout">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </footer>
  );
};

export default Footer;
