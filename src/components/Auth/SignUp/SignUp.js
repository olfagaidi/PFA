import React, { useState } from 'react';
import axios from 'axios'; // Assurez-vous d'avoir axios installé
import './SignUp.css';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    dateOfBirth: '',
    phone: '',
    username: '',
    password: '',
    repassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Champ obligatoire";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "L'e-mail doit être une adresse e-mail valide";

    if (!form.dateOfBirth) newErrors.dateOfBirth = "Champ obligatoire";
    if (!form.phone) newErrors.phone = "Champ obligatoire";
    else if (form.phone.length < 8) newErrors.phone = "Le numéro de téléphone doit être composé de 8 chiffres";

    if (!form.username) newErrors.username = "Champ obligatoire";
    else if (form.username.length < 3) newErrors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères";
    else if (form.username.length > 20) newErrors.username = "Le nom d'utilisateur doit comporter au maximum 20 caractères";

    if (!form.password) newErrors.password = "Champ obligatoire";
    else if (form.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";

    if (!form.repassword) newErrors.repassword = "Champ obligatoire";
    else if (form.repassword.length < 6) newErrors.repassword = "Le mot de passe doit contenir au moins 6 caractères";
    else if (form.repassword !== form.password) newErrors.repassword = "Les mots de passe saisis ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8081/api/signup', form);
        console.log('Inscription réussie:', response.data);
        setIsSuccessful(true);
        setIsSignUpFailed(false);
        // Réinitialiser le formulaire
        setForm({
          email: '',
          dateOfBirth: '',
          phone: '',
          username: '',
          password: '',
          repassword: '',
        });
      } catch (err) {
        setIsSignUpFailed(true);
        setErrorMessage(err.response?.data?.message || "Une erreur s'est produite lors de l'inscription.");
        console.error('Erreur d\'inscription:', err);
      }
    } else {
      setIsSignUpFailed(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="form-login" onSubmit={onSubmit}>
      <div className="card card-container">
        <h2 className="form-login-heading">INSCRIVEZ-VOUS MAINTENANT</h2>
        
        {!isSuccessful && (
          <div className="login-wrap">
            <div className="form-row">
              <div className="col-6">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.email}</small>
              </div>

              <div className="col-6">
                <label htmlFor="dateOfBirth">Date de naissance</label>
                <input
                  type="date"
                  className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.dateOfBirth}</small>
              </div>
            </div>

            <div className="form-row">
              <div className="col-6">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.phone}</small>
              </div>

              <div className="col-6">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.username}</small>
              </div>
            </div>

            <div className="form-row">
              <div className="col-6">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Mot de passe'
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.password}</small>
              </div>

              <div className="col-6">
                <label htmlFor="repassword">Confirmez le mot de passe</label>
                <input
                  type="password"
                  className={`form-control ${errors.repassword ? 'is-invalid' : ''}`}
                  name="repassword"
                  value={form.repassword}
                  onChange={handleChange}
                  placeholder='Mot de passe'
                  required
                />
                <small className="text-danger" style={{ fontSize: '11px' }}>{errors.repassword}</small>
              </div>
            </div>

            <button className="btn btn-theme btn-block" type="submit">
              <i className="fa fa-lock"></i> S'inscrire
            </button>

            {isSignUpFailed && (
              <div className="alert alert-warning">
                L'inscription a échoué !<br />{errorMessage}
              </div>
            )}
          </div>
        )}

        {isSuccessful && <div className="success">Vous vous êtes inscrit avec succès</div>}
      </div>
    </form>
  );
};

export default SignupForm;
