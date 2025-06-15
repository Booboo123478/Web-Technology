import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import './Auth.css';
import Button from '../../components/common/Button/Button';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };
  
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Adresse e-mail invalide.');
      return;
    }

    try {
      const response = await axios.post(
        '/api/users/login',
        new URLSearchParams({
          mail: email,
          password: password,
        }),
        { withCredentials: true }
      );

      console.log('Login réussi :', response.data);
      window.location.href = '/home'; 

    } catch (err) {
      console.error(err);
      setError('Identifiants incorrects ou erreur serveur.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Mot de passe" type="password" name="password" value={formData.password} onChange={handleChange} />
        {error && <div className='error'>{error}</div>}
        <Button type="submit" text="Se connecter" />
        <p className="switch-link">
          Pas encore de compte ? <a href="/register">Inscription</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
