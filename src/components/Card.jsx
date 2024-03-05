import { Button } from "./Button.jsx";

/**
 * @param {string} image
 * @param {string} title
 * @param {string} description
 * @param {string} href
 * @param {string} buttonLabel
 * @returns {JSX.Element}
 */
export function Card({
  image,
  title,
  description,
  href,
  buttonLabel,
  date,
  onClick,
  texte,
  category,
}) {
  const showButton = !!(href && buttonLabel);

  return (
    <div className="odyssee-card d-flex " data-aos="fade-up">
      {image && (
        <a href={href}>
          <img
            src={image}
            className="odyssee-image"
            alt=""
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </a>
      )}
      <div className="">
        <div className="d-flex flex-column justify-content-between red  ">
          <a href={href}>
            <h3 className="card-title">{title}</h3>
          </a>

          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <p className="pe-3 texted">
                <strong>Texte :</strong> {texte}
              </p>
              <p className="">
                <strong>Date :</strong> {date}
              </p>
            </div>
            <p className="category">{category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
