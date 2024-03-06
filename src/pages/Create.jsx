import { Button } from "../components/Button.jsx";
import { Input } from "../components/Input.jsx";
import { useState } from "react";
import { Alert } from "../components/Alert.jsx";
import "../styles/Edit.css";
import { adress } from "../utils/adress.js";

export function Create({ onSave }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories] = useState([
    "Portrait Vigneron",
    "Parlons vins",
    "Mets & Vins",
    "Restaurateurs",
    "Conseils & Astuces",
  ]); // Liste de catégories

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    const cleanedTitle = objectData.title.replace(/[^\w\s?!À-ÿ]/gi, "");

    // Les catégories sélectionnées
    const selectedCategories = categories.filter(
      (category) => objectData[category]
    );

    const requestBody = {
      title: cleanedTitle,
      body: objectData.body,
      picture: objectData.picture,
      categories: selectedCategories, // Utiliser les catégories sélectionnées
    };

    // Récupérer le token depuis localStorage
    const token = localStorage.getItem("token");

    fetch(`${adress}/api/articles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête Authorization
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            const errorMessage = errorData.message
              .replaceAll("Validation error: ", "")
              .replaceAll(",", "");
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        setLoading(false);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
        setLoading(false);
      });
  };

  // Vérifie si connecté
  const isLogged = localStorage.getItem("token");
  if (!isLogged) {
    window.location.href = "/";
  }

  return (
    <div>
      <div className="edit">
        <h1>Editer l'article </h1>
        {error && <Alert type="danger">{error.toString()}</Alert>}
        <form action="" onSubmit={handleSubmit} className="vstack gap-3">
          <Input name="title" label="Titre" defaultValue="" />
          <Input name="body" label="Contenu" type="textarea" defaultValue="" />
          <Input
            name="picture"
            label="Image"
            defaultValue="https://alicegren.fr/wp-content/uploads/2018/04/vignobles-fran%C3%A7ais.jpg"
          />

          {/* Créer des cases à cocher pour chaque catégorie */}
          {categories.map((category) => (
            <div key={category}>
              <label>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  name={category}
                />
                {category}
              </label>
            </div>
          ))}
          <div className="hstack gap-2 justify-content-end">
            <Button disabled={loading} type="submit">
              Sauvegarder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
