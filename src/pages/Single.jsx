import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Button } from "../components/Button.jsx";
import { useToggle } from "../hooks/useToggle.js";
import { EditPostModal } from "./Single/EditPostModal.jsx";
import Markdown from "react-markdown";
import "../styles/Single.css";
import { adress } from "../utils/adress.js";

export function Single({ postId }) {
  const {
    data: post,
    loading,
    error,
    setData,
  } = useFetch(`${adress}/api/articles/${postId}`);
  useDocumentTitle(post?.data.title);
  const [isEditing, toggleEditing] = useToggle(false);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>;
  }

  const handleSave = (data) => {
    setData({
      ...post,
      ...data,
    });
    toggleEditing();
  };

  const isLogged = localStorage.getItem("token");

  // Changer la date
  const date = new Date(post.data.created);
  const jour = date.getDate().toString().padStart(2, "0");
  const mois = (date.getMonth() + 1).toString().padStart(2, "0");
  const annee = date.getFullYear();
  const dateFormatted = `${jour}/${mois}/${annee}`;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {post.data ? (
          <div
            style={{
              maxWidth: "800px",
            }}
          >
            <h1 className="mb-3">{post.data.title}</h1>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <p className="pe-3 texted">
                  <strong>Texte :</strong> L&C Vins
                </p>
                <p className="">
                  <strong>Date :</strong> {dateFormatted}
                </p>
              </div>
              <p className="category">{post.data.categories[0]}</p>
            </div>
            {isLogged && (
              <Button className="btn-cool" onClick={toggleEditing}>
                Editer l'article
              </Button>
            )}
            <img src={post.data.picture} alt="" className="img-fluid  my-3" />
            <Markdown className="markdown">{post.data.body}</Markdown>

            {isEditing && (
              <EditPostModal
                post={post}
                onClose={toggleEditing}
                onSave={handleSave}
              />
            )}
          </div>
        ) : (
          <p>Il n'y a pas d'article ici...</p>
        )}
      </div>
    </>
  );
}
