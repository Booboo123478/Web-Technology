import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo">
        LOGO
      </div>

      <div className="footer-section links">
        <a href="/cgu">CGU</a>
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        <a href="/plan-du-site">Plan du site</a>
      </div>

      <div className="footer-section logout">
        <a href='/logout'>Logout</a>
      </div>
    </footer>
  );
};

export default Footer;
