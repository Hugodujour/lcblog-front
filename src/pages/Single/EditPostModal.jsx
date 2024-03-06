import { Modal } from "../../components/Modal.jsx";
import { Button } from "../../components/Button.jsx";
import { Input } from "../../components/Input.jsx";
import { useState } from "react";
import { Alert } from "../../components/Alert.jsx";
import { adress } from "../../utils/adress.js";

export function EditPostModal({ post, onClose, onSave }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    "Portrait Vigneron",
    "Parlons vins",
    "Mets & Vins",
    "Restaurateurs",
    "Conseils & Astuces",
  ]); // Liste de catégories

  // Récupérer le token depuis localStorage
  const token = localStorage.getItem("token");

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer l'article ?"
    );
    if (confirmDelete) {
      setLoading(true);

      fetch(`${adress}/api/articles/${post.data.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête Authorization
        },
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

          //redirect
          window.location.href = "/";

          return response.json();
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setError(error);
          setLoading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    // Nettoyer le titre en retirant tous les caractères spéciaux
    const cleanedTitle = objectData.title.replace(/[^\w\s?!À-ÿ]/gi, "");

    const selectedCategories = categories.filter(
      (category) => objectData[category]
    );

    const requestBody = {
      title: cleanedTitle,
      body: objectData.body,
      picture: objectData.picture,
      categories: selectedCategories,
    };

    fetch(`${adress}/api/articles/${post.data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      .then((data) => {
        setLoading(false);
        // Vérifier si le titre a changé
        if (data.data.title !== post.data.title) {
          // Rediriger l'utilisateur vers une nouvelle page avec le slug du nouvel article
          window.location.href = `/#:${data.data.slug}`;
          onSave(data);
        } else {
          // Sinon, exécuter la fonction onSave normalement
          onSave(data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <Modal onClose={onClose}>
      <h1>Editer l'article </h1>
      {error && <Alert type="danger">{error.toString()}</Alert>}
      <form action="" onSubmit={handleSubmit} className="vstack gap-3">
        <Input name="title" label="Titre" defaultValue={post.data.title} />
        <Input
          name="body"
          label="Contenu"
          type="textarea"
          defaultValue={post.data.body}
        />
        <Input name="picture" label="Image" defaultValue={post.data.picture} />
        {/* Créer des cases à cocher pour chaque catégorie */}
        {categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                name={category}
                defaultChecked={post.data.categories.includes(category)}
              />
              {category}
            </label>
          </div>
        ))}
        <div className="hstack gap-2 justify-content-end">
          <Button
            disabled={loading}
            type="button"
            className="btn-danger"
            onClick={handleDelete}
          >
            Supprimer
          </Button>
          <Button
            disabled={loading}
            type="button"
            className="btn-sec"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button disabled={loading} type="submit">
            Sauvegarder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
