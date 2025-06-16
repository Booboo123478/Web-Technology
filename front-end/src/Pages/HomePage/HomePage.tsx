import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const HomePage: React.FC = () => {
  return (
    <><Header />
    <div className="home-page">
          <h1>Bienvenue sur la page d’accueil</h1>
          <p>Bienvenue sur notre site, prenez rendez-vous avec des professionnels et des particuliers !</p>
      </div><Footer /></>
  );
};

export default HomePage;
