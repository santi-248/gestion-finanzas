import { Link } from 'react-router-dom';

export default function LandingFooter() {
  const currentYear = 2026;

  return (
    <footer className="landing-footer">
      {/* Top 4-Column Grid Section */}
      <div className="landing-footer-top">
        <div className="landing-footer-grid">
          {/* Column 1: Explore */}
          <div className="landing-footer-col">
            <span className="landing-footer-col-title">EXPLORAR</span>
            <ul className="landing-footer-links">
              <li>
                <Link to="/" className="landing-footer-link">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#features" className="landing-footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="landing-footer-link">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div className="landing-footer-col">
            <span className="landing-footer-col-title">PLATAFORMA</span>
            <ul className="landing-footer-links">
              <li>
                <Link to="/dashboard" className="landing-footer-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/presupuesto" className="landing-footer-link">
                  Presupuesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Repository / GitHub */}
          <div className="landing-footer-col landing-footer-col-connect">
            <span className="landing-footer-col-title">REPOSITORIO</span>
            <a
              href="https://github.com/santi-248/gestion-finanzas"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-email-link"
              aria-label="Repositorio GitHub de gestion-finanzas"
            >
              github.com/santi-248/gestion-finanzas
            </a>
            <p className="landing-footer-contact-sub">
              Gestiona mejor tus finanzas
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Black solid banner) */}
      <div className="landing-footer-bottom">
        <div className="landing-footer-bottom-inner">
          {/* Logo & Brand Name (Left) */}
          <Link to="/" className="landing-footer-brand" aria-label="ADM Finanzas">
            <span className="landing-footer-logo-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.5L2.5 8.5L12 14.5L21.5 8.5L12 2.5Z" fill="currentColor" />
                <path d="M2.5 13.5L12 19.5L21.5 13.5L19.5 12.2L12 17L4.5 12.2L2.5 13.5Z" fill="currentColor" />
              </svg>
            </span>
            <span className="landing-footer-brand-title">ADM</span>
          </Link>

          {/* Copyright notice (Center) */}
          <div className="landing-footer-copy">
            © {currentYear} ADM Finanzas — Todos los derechos reservados
          </div>

          {/* Social Icons (Right) */}
          <div className="landing-footer-socials" aria-label="Redes sociales">
            {/* GitHub */}
            <a
              href="https://github.com/santi-248/gestion-finanzas"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-social-icon"
              aria-label="GitHub - Repositorio"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
