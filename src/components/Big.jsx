import Markdown from "react-markdown";

function shortenContent(content, maxLength) {
  if (content.length <= maxLength) return content;

  // Trouver l'index de l'espace le plus proche avant maxLength
  const lastSpaceIndex = content.lastIndexOf(" ", maxLength);
  if (lastSpaceIndex === -1) return content.slice(0, maxLength);

  return content.slice(0, lastSpaceIndex) + "...";
}

export function Big({ titre, body, image, category, texte, date, href }) {
  const markdownText = body;
  const cleanedText = markdownText.replace(/\s+/g, " ").trim();
  const shortenedDescription = shortenContent(cleanedText, 200); // Limitez à 200 caractères par exemple

  return (
    <div className="pt-5">
      <div className="d-flex flexito">
        <a href={href}>
          <h2 className="titre">{titre}</h2>
        </a>
        <div className="d-flex flex-column justify-content-between margoulino">
          <div className="preview">
            <a href={href}>
              <Markdown>{shortenedDescription}</Markdown>
            </a>
          </div>

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
      <div className="text-center w100 pt-5">
        <a href={href}>
          <img src={image} />
        </a>
      </div>
    </div>
  );
}
