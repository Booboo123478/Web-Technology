import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const Footer: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Erreur de déconnexion');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la déconnexion', error);
    }
  };

  return (
    <footer className="footer">
      <Link to="/home">
        <img src="/image/moshii.png" alt="Logo Moshii" className="logo" />
      </Link>

      <div className="footer-section links">
        <a href="/cgu">CGU</a>
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
      </div>

      <div className="footer-section logout">
        <Button text={'Logout'} onClick={handleLogout} />
      </div>
    </footer>
  );
};

export default Footer;
