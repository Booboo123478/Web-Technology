import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import './Auth.css';
import Button from '../../components/common/Button/Button';
import axios from 'axios';

type UserType = 'client' | 'prestataire';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState<UserType>('client');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value as UserType);
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
      const endpoint = userType === 'client' ? '/api/users/login' : '/api/prestataires/login';

      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );

      console.log('Login réussi :', response.data);

      const role = response.data.role;
      localStorage.setItem('userRole', role.toString());

      if (userType === 'prestataire') {
        localStorage.setItem('prestataireId', response.data.idPrestataire.toString());
      } else {
        localStorage.setItem('userId', response.data.idUser.toString());
      }

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

        <div className="user-type-selector">
          <label>
            <input
              type="radio"
              name="userType"
              value="client"
              checked={userType === 'client'}
              onChange={handleUserTypeChange}
            />
            Client
          </label>

          <label>
            <input
              type="radio"
              name="userType"
              value="prestataire"
              checked={userType === 'prestataire'}
              onChange={handleUserTypeChange}
            />
            Prestataire
          </label>
        </div>

        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Mot de passe" type="password" name="password" value={formData.password} onChange={handleChange} />

        {error && <div className='error'>{error}</div>}

        <Button type="submit" text="Se connecter" />

        <p className="switch-link">
          Pas encore de compte ?{" "}
          {userType === 'client' ? (
            <a href="/register">Inscription client</a>
          ) : (
            <a href="/inscription-prestataire">Inscription prestataire</a>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
