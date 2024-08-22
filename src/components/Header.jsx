import { useToggle } from "../hooks/useToggle.js";
import "../styles/Header.css";

/**
 * @param {string} page
 */
export function Header({ page }) {
  const [expanded, toggleExpanded] = useToggle(false);
  const isLogged = localStorage.getItem("token");

  return (
    <div className="container sticky-top">
      <nav className="navbar navbar-expand-lg b-bot justify-content-between">
        {" "}
        {/* Utilisation de justify-content-between */}
        <a className="navbar-brand " href="#">
          L&C BLOG
        </a>
        {isLogged && (
          <a href="#create">
            <button className="btn-cool">Créer un article</button>
          </a>
        )}
        <button
          onClick={toggleExpanded}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end  ${
            expanded ? "show d-flex " : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://lcvins.com/fr/">
                🔗L&C Vins
              </a>
            </li>
          </ul>

          <div className="d-none d-lg-block">
            <ul className="navbar-nav d-flex ">
              <li className="nav-item">
                <a className="nav-link">
                  <i className="bi bi-dash"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.instagram.com/lc_vins/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/lc-vins/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.facebook.com/LCVINSBORDEAUX"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
