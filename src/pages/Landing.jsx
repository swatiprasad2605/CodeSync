import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">CodeSync</div>

        <div className="nav-links">
          <Link to="/login">Login</Link>

          <Link to="/register" className="nav-button">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">CLOUD-BASED CODING REPOSITORY</p>

          <h1>
            Store. Share.
            <br />
            <span>Collaborate.</span>
          </h1>

          <p className="hero-description">
            CodeSync is a cloud-based platform for students to upload, manage,
            share and collaborate on programming projects.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-button">
              Create Account
            </Link>

            <Link to="/login" className="secondary-button">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;
