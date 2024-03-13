import "../styles/Footer.css";

export function Footer() {
  return (
    <div className="container footer">
      <footer className="py-3">
        <div className="d-flex justify-content-center align-items-center">
          <div className="green white texted">NOS RÉSEAUX 🥰</div>
          <div className="messagedefilant">
            <div
              className="white"
              data-text="🍇 Rejoignez-nous ! 🙂 Rejoignez-nous ! 🍷 Rejoignez-nous ! 😎 Rejoignez-nous ! 🎉 Rejoignez-nous ! 🥰 Rejoignez-nous ! 🥂 Rejoignez-nous ! 😋 Rejoignez-nous ! "
            >
              <span className="white">
                {`🍇 Rejoignez-nous ! 🙂 Rejoignez-nous ! 🍷 Rejoignez-nous ! 😎 Rejoignez-nous ! 🎉 Rejoignez-nous ! 🥰 Rejoignez-nous ! 🥂 Rejoignez-nous ! 😋 Rejoignez-nous ! `}
              </span>
            </div>
          </div>
        </div>

        <div className="insta text-center">
          <h3 className="title-footer">
            Prêts à partager
            <br />
            notre aventure ?
          </h3>
        </div>

        <p className="text-center grey px-3">
          <a href="/#login">Connexion - </a>© L&C Vins - SARL au capital de
          50.000,00 € - 809 960 081 RCS Bordeaux - 185 Bd du Président Wilson,
          33200 Bordeaux -{" "}
          <a
            href="https://docs.google.com/document/d/1rVBsRSOFh1sKNZEuhxJ0yS0KDNQyNfOUIIUqZsVEEw8/edit#heading=h.6kj0bldp451x"
            target="_blank"
            rel="noreferrer"
          >
            Politique de confidentialité
          </a>
        </p>
      </footer>
    </div>
  );
}
