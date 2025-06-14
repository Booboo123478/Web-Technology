import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import TextArea from '../../components/common/TextArea';
import './Auth.css';
import Button from '../../components/common/Button/Button';
import axios from 'axios';

const RegisterPrestataire: React.FC = () => {
  const [formData, setFormData] = useState({
    prestataireMail: '',
    password: '',
    prestataireName: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { prestataireMail, password, prestataireName } = formData;

    if (!prestataireMail || !password || !prestataireName) {
      setError('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      await axios.post(
        '/api/prestataires',
        formData,
        { withCredentials: true }
      );

      setSuccess('Inscription réussie !');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’inscription du prestataire.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Inscription Prestataire</h2>

        <InputField
          label="Mail du prestataire *"
          name="prestataireMail"
          type="text"
          value={formData.prestataireMail}
          onChange={handleChange}
        />

        <InputField
          label="Mot de passe *"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <InputField
          label="Nom du prestataire *"
          name="prestataireName"
          type="text"
          value={formData.prestataireName}
          onChange={handleChange}
        />

        <TextArea
          label="Description (optionnel)"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <Button type="submit" text="S'inscrire en tant que prestataire" />

        <p className="switch-link">
          Déjà prestataire ? <a href="/login">Connectez-vous</a>
        </p>
        <p>
          Vous êtes un client ?&nbsp;
          <a href="/register">Inscription client ici</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPrestataire;
