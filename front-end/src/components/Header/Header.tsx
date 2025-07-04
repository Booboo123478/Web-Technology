import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isPrestataire, setIsPrestataire] = useState<boolean | null>(null);

  
  useEffect(() => {
    fetch('/api/session', { credentials: 'include' })
      .then(res => res.ok ? res.json() : { type: 'none' })
      .then(data => {
        if (data.type === 'prestataire') setIsPrestataire(true);
        else if (data.type === 'user')   setIsPrestataire(false);
        else                             setIsPrestataire(false);
      })
      .catch(() => setIsPrestataire(false));
  }, []);

  
  if (isPrestataire === null) return null;

  const servicesLink = isPrestataire ? '/mes-services' : '/recherche-services';

  return (
    <div className="navbar">
      <Link to="/home">
        <img src="/image/moshii.png" alt="Logo Moshii" className="logo" />
      </Link>

      <div className="footer-section links">
        <a href={servicesLink}>Services</a>

        {isPrestataire ? (
          <>
            <a href="/ajouter-service">Ajouter un service</a>
            <a href="/mes-demandes">Demandes</a>
          </>
        ) : (
          <a href="/reservations">Mes réservations</a>
        )}
      </div>

      <div className="icons">
        <a href="/messaging">
          <svg viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-4-1l-4.3 1 1.3-3.7a8.38 8.38 0 01-1.4-4.7 8.5 8.5 0 018.5-8.5 8.38 8.38 0 014.7 1.4 8.5 8.5 0 013.7 7.8z"/>
          </svg>
        </a>

        <a href="/profile">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4"/>
            <path d="M5.5 21a8.38 8.38 0 0113 0"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Header;