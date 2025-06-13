import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Legal.css';

const Terms: React.FC = () => {
  return (
    <>
      <Header />
      <div className="legal-page">
        <h1>Conditions Générales d’Utilisation (CGU)</h1>
        <p>Bienvenue sur notre plateforme de réservation de services à domicile.</p>
        <h2>1. Objet</h2>
        <p>Les présentes CGU régissent l’utilisation du site par les utilisateurs (clients et prestataires).</p>

        <h2>2. Utilisation du service</h2>
        <p>Les utilisateurs doivent fournir des informations exactes et respecter les lois en vigueur.</p>

        <h2>3. Responsabilités</h2>
        <p>La plateforme agit comme intermédiaire. Les prestations sont sous la responsabilité des prestataires.</p>

        <h2>4. Résiliation</h2>
        <p>Nous nous réservons le droit de suspendre un compte en cas de non-respect des CGU.</p>

        <h2>5. Contact</h2>
        <p>Pour toute question : support@services.com</p>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
