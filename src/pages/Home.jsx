import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFetch } from "../hooks/useFetch.js";
import { Spinner } from "../components/Spinner.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";
import Markdown from "react-markdown";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Home.css";
import "../styles/Btn.css";
import { Big } from "../components/Big.jsx";
import lcvins from "../images/lcvins.png";
import { adress } from "../utils/adress.js";

// Fonction pour raccourcir le contenu sans couper au milieu des phrases
function shortenContent(content, maxLength) {
  if (content.length <= maxLength) return content;

  // Trouver l'index de l'espace le plus proche avant maxLength
  const lastSpaceIndex = content.lastIndexOf(" ", maxLength);
  if (lastSpaceIndex === -1) return content.slice(0, maxLength);

  return content.slice(0, lastSpaceIndex) + "...";
}

export function Home() {
  useDocumentTitle("L&C Blog");
  const { data, loading, error } = useFetch(`${adress}/api/articles?limit=30`);

  // Fonction pour vérifier et retirer le token expiré
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Temps actuel en secondes

        if (decodedToken.exp < currentTime) {
          // Si le token est expiré, le retirer du local storage
          localStorage.removeItem("token");
          // Recharger la page pour prendre en compte les changements
          window.location.reload();
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>;
  }

  const d = new Date(data.data[0].created);
  const j = d.getDate().toString().padStart(2, "0");
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const a = d.getFullYear();
  const forma = `${j}/${m}/${a}`;

  return (
    <>
      <div className="title-home" data-aos="fade-up">
        <svg
          className="fulled"
          width="454.932"
          height="73.146"
          viewBox="0 0 454.932 73.146"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            strokeWidth="0.25mm"
            style={{
              stroke: "#212529",
              strokeWidth: "0.25mm",
              fill: "#212529",
            }}
          >
            <path
              d="M 454.932 34.132 L 454.932 63.331 Q 451.643 66.985 445.822 69.458 A 42.132 42.132 0 0 1 443.359 70.411 A 47.452 47.452 0 0 1 431.661 72.884 A 57.512 57.512 0 0 1 426.66 73.097 A 37.039 37.039 0 0 1 416.976 71.895 A 27.258 27.258 0 0 1 404.346 64.552 Q 395.996 56.007 395.41 40.773 L 395.361 34.62 A 50.209 50.209 0 0 1 396.15 25.508 A 37.236 37.236 0 0 1 399.072 16.285 A 28.862 28.862 0 0 1 404.916 7.944 A 26.591 26.591 0 0 1 409.692 4.225 A 28.821 28.821 0 0 1 421.812 0.203 A 36.238 36.238 0 0 1 425.684 0.001 A 46.669 46.669 0 0 1 433.761 0.656 Q 438.163 1.43 441.671 3.122 A 22.76 22.76 0 0 1 446.313 6.08 A 22.285 22.285 0 0 1 452.994 15.71 Q 454.406 19.509 454.883 24.22 L 438.379 24.22 A 22.82 22.82 0 0 0 437.682 21.003 Q 437.2 19.395 436.501 18.148 A 8.96 8.96 0 0 0 434.57 15.724 Q 431.641 13.185 426.27 13.185 A 12.052 12.052 0 0 0 421.434 14.122 Q 418.369 15.449 416.309 18.653 A 19.267 19.267 0 0 0 414.108 23.584 Q 412.774 28.05 412.744 34.278 L 412.744 38.575 Q 412.744 49.22 416.382 54.566 A 11.794 11.794 0 0 0 424.187 59.579 A 18.815 18.815 0 0 0 427.832 59.913 A 23.899 23.899 0 0 0 431.503 59.651 Q 435.493 59.029 437.793 56.935 L 437.793 45.899 L 425.879 45.899 L 425.879 34.132 L 454.932 34.132 Z M 162.061 48.048 L 179.102 48.048 A 27.814 27.814 0 0 1 177.597 56.05 A 24.347 24.347 0 0 1 175.098 61.158 A 23.778 23.778 0 0 1 166.231 69.257 A 28.906 28.906 0 0 1 164.819 69.972 A 32.36 32.36 0 0 1 155.326 72.727 A 41.427 41.427 0 0 1 149.707 73.097 A 34.587 34.587 0 0 1 140.081 71.826 A 25.814 25.814 0 0 1 127.637 63.966 Q 119.58 54.835 119.58 38.185 L 119.58 34.669 A 50.735 50.735 0 0 1 120.376 25.465 A 37.729 37.729 0 0 1 123.218 16.383 A 28.904 28.904 0 0 1 128.926 8.067 A 26.563 26.563 0 0 1 133.691 4.274 Q 140.527 0.001 149.512 0.001 Q 162.451 0.001 170.313 6.813 A 25.373 25.373 0 0 1 178.372 20.262 A 35.22 35.22 0 0 1 179.248 25.587 L 162.158 25.587 Q 162.042 21.718 160.903 19.149 A 8.597 8.597 0 0 0 158.887 16.261 A 9.514 9.514 0 0 0 155.578 14.325 Q 154.119 13.807 152.32 13.588 A 23.332 23.332 0 0 0 149.512 13.429 A 13.408 13.408 0 0 0 145.703 13.938 A 9.564 9.564 0 0 0 140.137 18.214 Q 137.524 22.412 137.09 31.005 A 68.451 68.451 0 0 0 137.012 33.497 L 137.012 38.526 A 72.623 72.623 0 0 0 137.19 43.809 Q 137.584 49.184 138.845 52.586 A 13.961 13.961 0 0 0 139.868 54.786 A 9.426 9.426 0 0 0 146.289 59.325 A 15.891 15.891 0 0 0 149.707 59.669 A 20.142 20.142 0 0 0 153.128 59.397 Q 155.009 59.073 156.502 58.36 A 9.484 9.484 0 0 0 158.74 56.886 A 8.861 8.861 0 0 0 161.08 53.422 Q 161.63 52.014 161.875 50.267 A 20.781 20.781 0 0 0 162.061 48.048 Z M 63.867 34.767 L 64.014 34.669 Q 61.133 30.567 59.497 26.857 A 18.817 18.817 0 0 1 57.861 19.191 A 21.545 21.545 0 0 1 58.78 12.752 A 17.204 17.204 0 0 1 63.428 5.299 Q 68.994 0.001 77.979 0.001 A 21.693 21.693 0 0 1 84.442 0.924 A 17.639 17.639 0 0 1 91.309 4.908 Q 96.582 9.816 96.582 17.091 A 16.405 16.405 0 0 1 92.96 27.276 Q 90.561 30.403 86.572 33.204 L 82.861 35.792 L 93.799 48.341 A 25.749 25.749 0 0 0 96.474 37.369 A 30.024 30.024 0 0 0 96.484 36.573 L 110.303 36.573 A 50.769 50.769 0 0 1 109.454 46.14 Q 108.406 51.602 106.061 55.948 A 28.055 28.055 0 0 1 103.662 59.669 L 114.502 72.12 L 96.143 72.12 L 92.822 68.36 A 34.633 34.633 0 0 1 86.177 71.445 A 31.331 31.331 0 0 1 84.448 71.974 Q 80.176 73.146 74.805 73.146 A 32.689 32.689 0 0 1 67.766 72.43 Q 61.977 71.154 57.91 67.604 A 18.145 18.145 0 0 1 51.601 54.419 A 24.595 24.595 0 0 1 51.563 53.028 A 16.456 16.456 0 0 1 54.077 44.093 A 18.808 18.808 0 0 1 55.99 41.599 Q 58.137 39.197 61.706 36.401 A 82.28 82.28 0 0 1 63.867 34.767 Z M 240.967 72.12 L 212.109 72.12 L 212.109 1.026 L 237.646 1.026 A 59.957 59.957 0 0 1 245.398 1.493 Q 249.218 1.993 252.34 3.026 A 23.537 23.537 0 0 1 258.521 6.056 A 16.201 16.201 0 0 1 265.516 17.914 A 23.125 23.125 0 0 1 265.674 20.655 A 20.005 20.005 0 0 1 265.17 25.25 A 15.161 15.161 0 0 1 263.135 30.079 A 14.134 14.134 0 0 1 257.707 34.931 A 18.374 18.374 0 0 1 255.664 35.841 A 17.579 17.579 0 0 1 260.022 37.599 A 13.726 13.726 0 0 1 264.209 41.31 A 14.941 14.941 0 0 1 266.977 48.138 A 19.862 19.862 0 0 1 267.188 51.075 A 26.184 26.184 0 0 1 266.492 57.304 A 16.793 16.793 0 0 1 260.571 66.774 A 21.415 21.415 0 0 1 254.144 70.188 Q 248.679 72.062 240.967 72.12 Z M 17.139 1.026 L 17.139 58.937 L 46.973 58.937 L 46.973 72.12 L 0 72.12 L 0 1.026 L 17.139 1.026 Z M 293.75 1.026 L 293.75 58.937 L 323.584 58.937 L 323.584 72.12 L 276.611 72.12 L 276.611 1.026 L 293.75 1.026 Z M 387.891 34.767 L 387.891 38.038 A 47.733 47.733 0 0 1 386.926 47.84 A 37.441 37.441 0 0 1 384.033 56.446 A 29.764 29.764 0 0 1 377.851 65.105 A 27.559 27.559 0 0 1 373.071 68.775 A 29.855 29.855 0 0 1 359.4 73.011 A 36.521 36.521 0 0 1 356.885 73.097 A 33.667 33.667 0 0 1 347.565 71.848 A 28.798 28.798 0 0 1 340.771 68.922 A 28.286 28.286 0 0 1 330.185 57.703 A 34.028 34.028 0 0 1 329.81 56.983 A 37.864 37.864 0 0 1 326.214 45.515 A 48.283 48.283 0 0 1 325.684 39.161 L 325.684 35.157 A 48.359 48.359 0 0 1 326.612 25.469 A 37.417 37.417 0 0 1 329.517 16.725 A 29.311 29.311 0 0 1 336.261 7.553 A 27.868 27.868 0 0 1 340.503 4.396 A 30.071 30.071 0 0 1 354.258 0.136 A 36.716 36.716 0 0 1 356.787 0.05 A 32.431 32.431 0 0 1 366.702 1.525 A 28.757 28.757 0 0 1 372.9 4.347 A 28.698 28.698 0 0 1 383.391 15.57 A 34.646 34.646 0 0 1 383.911 16.578 A 38.001 38.001 0 0 1 387.441 28.287 A 48.614 48.614 0 0 1 387.891 34.767 Z M 370.459 38.331 L 370.459 35.06 A 50.965 50.965 0 0 0 370.147 29.218 Q 369.408 22.833 366.919 18.971 A 12.236 12.236 0 0 0 363.464 15.364 Q 361.001 13.713 357.736 13.507 A 15.054 15.054 0 0 0 356.787 13.478 A 11.362 11.362 0 0 0 346.085 19.681 Q 343.482 24.43 343.164 32.814 L 343.115 38.038 Q 343.115 48.487 346.582 54.103 A 11.835 11.835 0 0 0 350.241 57.929 Q 352.548 59.41 355.59 59.665 A 15.522 15.522 0 0 0 356.885 59.718 A 12.107 12.107 0 0 0 361.732 58.781 Q 364.828 57.444 366.895 54.2 Q 370.393 48.71 370.458 38.432 A 61.101 61.101 0 0 0 370.459 38.331 Z M 241.26 41.896 L 229.248 41.896 L 229.248 58.937 L 240.479 58.937 Q 245.117 58.937 247.607 56.813 Q 250.098 54.689 250.098 50.831 Q 250.098 43.779 244.533 42.293 A 12.978 12.978 0 0 0 241.26 41.896 Z M 229.248 14.259 L 229.248 30.665 L 238.184 30.665 A 25.205 25.205 0 0 0 240.939 30.501 Q 243.752 30.166 245.439 29.148 A 5.994 5.994 0 0 0 246.191 28.614 A 6.43 6.43 0 0 0 248.32 25.09 Q 248.58 24.02 248.584 22.747 A 12.706 12.706 0 0 0 248.584 22.706 A 12.268 12.268 0 0 0 248.368 20.319 Q 247.836 17.642 245.996 16.236 A 7.789 7.789 0 0 0 243.842 15.111 Q 241.758 14.375 238.655 14.275 A 31.155 31.155 0 0 0 237.646 14.259 L 229.248 14.259 Z M 84.082 58.448 L 71.289 43.898 L 70.85 44.191 Q 68.066 47.608 68.066 51.905 A 9.375 9.375 0 0 0 68.655 55.272 A 8.522 8.522 0 0 0 70.312 57.96 A 7.456 7.456 0 0 0 73.002 59.903 A 7.441 7.441 0 0 0 75.879 60.45 A 17.751 17.751 0 0 0 84.082 58.448 Z M 75.781 27.296 L 79.053 25.245 A 15.906 15.906 0 0 0 80.453 24.227 Q 81.146 23.658 81.663 23.076 A 7.461 7.461 0 0 0 82.324 22.218 Q 83.289 20.747 83.346 18.541 A 10.832 10.832 0 0 0 83.35 18.263 A 5.513 5.513 0 0 0 81.787 14.357 A 5.069 5.069 0 0 0 78.108 12.699 A 6.229 6.229 0 0 0 77.93 12.696 A 6.932 6.932 0 0 0 76.08 12.93 A 5.024 5.024 0 0 0 73.633 14.43 A 5.926 5.926 0 0 0 72.241 17.245 A 8.553 8.553 0 0 0 72.07 18.995 Q 72.07 22.098 75.128 26.407 A 33.653 33.653 0 0 0 75.781 27.296 Z"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <div className="green white texted">BLOG VIN 🍇</div>
        <div className="messagedefilant">
          <div
            className="white"
            data-text="  🍇 Retrouvez tous nos articles pratiques autour du vin et de la
            restauration française  🍷  Retrouvez tous nos articles pratiques autour du vin et de la
            restauration française  "
          >
            <span className="white">
              {`  🍇  Retrouvez tous nos articles pratiques autour du vin et de la
              restauration française  🍷  Retrouvez tous nos articles pratiques autour du vin et de la
              restauration française `}
            </span>
          </div>
        </div>
      </div>

      <Big
        titre={data.data[0].title}
        image={data.data[0].picture}
        body={data.data[0].body}
        category={data.data[0].categories[0]}
        texte="L&C Vins"
        date={forma}
        href={`#:${data.data[0].slug}`}
      />

      <div className="d-flex">
        <div className="d-flex flex-column justify-content-center ">
          {data &&
            data.data
              .map((post) => {
                const date = new Date(post.created);
                const jour = date.getDate().toString().padStart(2, "0");
                const mois = (date.getMonth() + 1).toString().padStart(2, "0");
                const annee = date.getFullYear();
                const dateFormatted = `${jour}/${mois}/${annee}`;

                const markdownText = post.body;
                const cleanedText = markdownText.replace(/\s+/g, " ").trim();

                // Raccourcir le contenu
                const shortenedDescription = shortenContent(cleanedText, 200); // Limitez à 200 caractères par exemple

                return (
                  <div key={post.id}>
                    <Card
                      image={post.picture}
                      title={post.title}
                      description={
                        <Markdown className="preview respire">
                          {shortenedDescription}
                        </Markdown>
                      }
                      href={`#:${post.slug}`}
                      date={dateFormatted}
                      texte="L&C Vins"
                      category={post.categories[0]}
                    />
                  </div>
                );
              })
              .slice(1)}
        </div>
        <div className="stick d-none d-xl-block">
          <div className="ps-5">
            <h2 className="title-res">INSTAGRAM @LC_VINS</h2>
            <img src={lcvins} />
            <a
              href="https://www.instagram.com/lc_vins/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn-res d-flex justify-content-center align-items-center">
                <i className="bi bi-instagram me-1"></i>Nous rejoindre
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
