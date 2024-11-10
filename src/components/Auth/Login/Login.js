import React, { useState } from 'react';
import axios from 'axios'; 
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        username,
        password,
      });
      console.log('Connexion réussie:', response.data);
      
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>CONNECTEZ-VOUS MAINTENANT</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group remember-me">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <button type="submit" className="submit-button">
          &#128274; Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;
