import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';
import GradientASCII from './GradientASCII';
import LandingNavbar from './LandingNavbar';
import LandingFeatures from './LandingFeatures';
import LandingAbout from './LandingAbout';
import LandingFooter from './LandingFooter';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page-wrapper">
      {/* Top Navigation Bar */}
      <LandingNavbar />

      {/* Hero Section Container */}
      <div className="landing-hero-container">
        {/* Background ASCII Animation */}
        <div className="landing-bg-ascii">
          <GradientASCII
            colors={["#83cc1688", "#10b932", "#a7f3d0"]}
            shape="pinch"
            characters="€£$-'"
            cellSize={16}
            density={0.85}
            lightMode={false}
            gradientOpacity={0.15}
            glyphOpacity={0.85}
            glow={0.2}
            scale={1.15}
          />
        </div>

        {/* Pill Badge at top */}
        <div className="landing-badge">
          <span>Proyecto en proceso</span>
          <span className="landing-badge-sparkle">✦</span>
        </div>

        <div className="landing-hero">
          {/* Main Headline */}
          <h1 className="landing-title">
            <span className="landing-title-line">Gestiona mejor</span>
            <span className="landing-title-line">
              tus <span className="landing-accent">finanzas</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="landing-subtitle">
            Una plataforma simple para seguir tu patrimonio en tiempo real, presupuestar en ARS y USD, y alcanzar tus objetivos más rápido.
          </p>

          {/* Compound Pill CTA Button */}
          <Link to="/dashboard" className="landing-cta" id="cta-get-started" aria-label="Comenzar con la gestión de finanzas">
            <span className="landing-cta-text">Comenzar</span>
            <span className="landing-cta-icon-box">
              <ArrowDownRight size={22} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>

      {/* Features Section (Matching Reference Layout) */}
      <LandingFeatures />

      {/* About Us Section */}
      <LandingAbout />

      {/* Footer Section */}
      <LandingFooter />
    </div>
  );
}
