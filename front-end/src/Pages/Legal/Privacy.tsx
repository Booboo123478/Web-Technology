import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Legal.css';

const Privacy: React.FC = () => {
  return (
    <>
      <Header />
      <div className="legal-page">
        <h1>Politique de Confidentialité</h1>
        <p>Cette politique décrit comment vos données sont collectées et utilisées.</p>

        <h2>1. Données collectées</h2>
        <p>Nom, email, adresse, données de réservation, messages échangés, etc.</p>

        <h2>2. Finalité</h2>
        <p>Amélioration du service, gestion des réservations, communication avec les utilisateurs.</p>

        <h2>3. Conservation</h2>
        <p>Les données sont conservées pendant la durée nécessaire à la fourniture du service.</p>

        <h2>4. Sécurité</h2>
        <p>Nous utilisons des protocoles sécurisés pour protéger vos informations.</p>

        <h2>5. Droits</h2>
        <p>Vous pouvez accéder, modifier ou supprimer vos données sur demande à dpo@services.com.</p>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
