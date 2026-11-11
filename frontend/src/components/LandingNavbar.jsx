import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MenuUsuario from './MenuUsuario';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { autenticado, usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'INICIO', to: '/', isRoute: true },
    { label: 'FEATURES', href: '#features', isRoute: false },
    { label: 'NOSOTROS', href: '#about', isRoute: false },
    { label: 'DASHBOARD', to: '/dashboard', isRoute: true },
    { label: 'PRESUPUESTO', to: '/presupuesto', isRoute: true },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const salir = () => {
    cerrarSesion();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="landing-navbar-wrapper">
      <nav className="landing-navbar" aria-label="Navegación principal">
        {/* Brand / Logo (Left) */}
        <Link to="/" className="landing-nav-brand" aria-label="ADM Finanzas - Inicio">
          <span className="landing-nav-logo-icon" aria-hidden="true">
            {/* Stacked geometric diamond layers matching reference image */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.5L2.5 8.5L12 14.5L21.5 8.5L12 2.5Z" fill="currentColor" />
              <path d="M2.5 13.5L12 19.5L21.5 13.5L19.5 12.2L12 17L4.5 12.2L2.5 13.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="landing-nav-brand-title">ADM</span>
        </Link>

        {/* Center Pill Dock */}
        <div className="landing-nav-center-dock">
          <ul className="landing-nav-dock-list">
            {navLinks.map((item) => (
              <li key={item.label} className="landing-nav-dock-item">
                {item.isRoute ? (
                  <Link to={item.to} className="landing-nav-dock-link">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="landing-nav-dock-link">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Auth / Action Buttons */}
        <div className="landing-nav-actions">
          {autenticado ? (
            <MenuUsuario variante="landing" />
          ) : (
            <Link to="/login" className="landing-nav-ingresar" aria-label="Ingresar a ADM Finanzas">
              COMENZAR
            </Link>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="landing-nav-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="landing-nav-mobile-menu">
          <ul className="landing-nav-mobile-list">
            {navLinks.map((item) => (
              <li key={`mobile-${item.label}`}>
                {item.isRoute ? (
                  <Link
                    to={item.to}
                    className="landing-nav-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="landing-nav-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="landing-nav-mobile-divider" />
            {autenticado ? (
              <li>
                <button
                  type="button"
                  className="landing-nav-mobile-link"
                  onClick={salir}
                >
                  CERRAR SESIÓN
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="landing-nav-mobile-ingresar"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  COMENZAR
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
