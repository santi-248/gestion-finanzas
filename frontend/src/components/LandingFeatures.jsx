import { Layers, PieChart, TrendingUp } from 'lucide-react';
import founderAvatar from '../assets/founder-avatar.jpeg';

export default function LandingFeatures() {

  const quoteCard = {
    quote: "“El control de tus finanzas no debe requerir horas de frustración en hojas de cálculo.”",
    authorName: "Santiago Apoud",
    authorRole: "Product Owner, CEO y & Founder",
    avatar: founderAvatar,
    description: "Diseñamos una plataforma que elimina la complejidad innecesaria. Centralizamos tus cuentas, automatizamos las conversiones y te damos la foto exacta de tu patrimonio en un solo lugar.",
  };

  const featureItems = [
    {
      number: "01",
      title: "Cuentas multimoneda (ARS/USD)",
      description: "Sigue tus cajas de ahorro, billeteras virtuales, efectivo e inversiones en pesos y dólares sin tener que hacer conversiones manuales.",
      icon: Layers,
    },
    {
      number: "02",
      title: "Presupuesto mensual ágil",
      description: "Clasifica tus ingresos, gastos e inversiones de forma simple para saber exactamente hacia dónde va tu dinero y mantener tus metas al día.",
      icon: PieChart,
    },
    {
      number: "03",
      title: "Evolución histórica de patrimonio",
      description: "Visualiza el crecimiento real de tu patrimonio con métricas y proyecciones a lo largo del tiempo, tomando decisiones con datos certeros.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="landing-features-section" id="features" aria-label="Características y Filosofía">
      <div className="landing-features-container">

        {/* 2-Column Main Layout */}
        <div className="landing-features-grid">
          {/* Left Column: Dark Quote Card + Paragraph */}
          <div className="landing-features-left">
            <div className="landing-features-quote-card">
              <blockquote className="landing-features-quote">
                {quoteCard.quote}
              </blockquote>

              <div className="landing-features-author">
                <img
                  src={quoteCard.avatar}
                  alt={quoteCard.authorName}
                  className="landing-features-avatar"
                  loading="lazy"
                />
                <div className="landing-features-author-info">
                  <span className="landing-features-author-name">{quoteCard.authorName}</span>
                  <span className="landing-features-author-role">{quoteCard.authorRole}</span>
                </div>
              </div>
            </div>

            <p className="landing-features-left-desc">
              {quoteCard.description}
            </p>
          </div>

          {/* Right Column: Numbered Features List */}
          <div className="landing-features-right">
            <div className="landing-features-list">
              {featureItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <article key={item.number} className="landing-features-item">
                    <span className="landing-features-item-num">{item.number}</span>
                    <div className="landing-features-item-body">
                      <h3 className="landing-features-item-title">{item.title}</h3>
                      <p className="landing-features-item-desc">{item.description}</p>
                    </div>
                    <div className="landing-features-item-icon-wrapper" aria-hidden="true">
                      <IconComponent size={24} strokeWidth={1.8} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
