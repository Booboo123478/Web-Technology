import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import './Auth.css';
import Button from '../../components/common/Button/Button';
import axios from 'axios';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Adresse e-mail invalide.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
    await axios.post(
      '/api/users/register',
      new URLSearchParams({
        userName: email.split('@')[0],
        mail: email,
        password: password,
      }),
      { withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
       } 
    );

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    setError('Erreur lors de l’inscription. Veuillez réessayer.');
  }
};

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Mot de passe" type="password" name="password" value={formData.password} onChange={handleChange} />
        <InputField label="Confirmer le mot de passe" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        {error && <div className='error'>{error}</div>}
        <Button type="submit" text="S'inscrire" />
        <p className="switch-link">
          Déjà inscrit ? <a href="/login">Connexion</a>
        </p>
        <p>
          Vous êtes prestataire ?&nbsp;
          <a href="/inscription-prestataire">Inscrivez-vous ici</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
