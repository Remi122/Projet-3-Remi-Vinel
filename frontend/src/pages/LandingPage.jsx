import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <header>
        <div className="block-logo">
          <img src="./images/groupomania-icon.png" alt="groupomania-icon" />
        </div>
        <div className="block-title">
          <h1>Groupomania</h1>
        </div>
      </header>
      <main className="landing-page-main">
        <section className="presentation-block">
          <h2>Groupomania</h2>
          <p>
            Bienvenue chez Groupomania !
            <br />
            Rejoignez vos collegues sur votre réseau social d'entreprise.
          </p>
        </section>
        <section className="login-block">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default LandingPage;
