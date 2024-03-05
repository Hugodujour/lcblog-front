import { useState } from "react";
import { adress } from "../utils/adress";
import "../styles/Login.css";

function LoginForm({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Effectuer l'appel à votre API pour vérifier les informations d'identification
    fetch(`${adress}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la connexion");
        }
        return response.json();
      })
      .then((data) => {
        // Récupérer le jeton Bearer du corps de la réponse JSON
        const token = data.token;
        // Stocker le jeton dans localStorage ou dans l'état de votre composant
        localStorage.setItem("token", token); // Vous pouvez stocker le jeton dans localStorage pour une utilisation ultérieure

        // Si la connexion réussit, appeler la fonction onLogin pour indiquer que l'utilisateur est connecté

        // Rediriger l'utilisateur vers la page d'accueil ou une autre page
        window.location.href = "/#";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">
            Nom d'utilisateur:
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            Mot de passe:
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button className="btn-cool" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
