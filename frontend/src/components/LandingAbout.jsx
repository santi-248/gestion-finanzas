export default function LandingAbout() {
  const highlights = [
    {
      number: "01",
      title: "ARS & USD unificados",
      desc: "Seguimiento consolidado de cuentas en pesos y dólares sin tener que hacer conversiones a mano.",
    },
    {
      number: "02",
      title: "Cero planillas rotas",
      desc: "Sin fórmulas complejas ni hojas de cálculo frágiles que se abandonan a las pocas semanas.",
    },
    {
      number: "03",
      title: "Claridad en tiempo real",
      desc: "Todo tu patrimonio, flujos y presupuesto visibles de forma transparente en un solo lugar.",
    },
  ];

  return (
    <section className="landing-about-section" id="about" aria-label="Sobre Nosotros">
      <div className="landing-about-container">
        {/* Section Kicker */}
        <div className="landing-about-kicker-wrapper">
          <span className="landing-about-kicker">SOBRE NOSOTROS</span>
        </div>

        {/* Minimal 2-Column Manifesto */}
        <div className="landing-about-main">
          <h2 className="landing-about-title">
            Nacimos para transformar el caos financiero en{' '}
            <span className="landing-accent">claridad</span>
          </h2>

          <div className="landing-about-narrative">
            <p className="landing-about-text-lead">
              ADM Finanzas nació de una necesidad cotidiana: la frustración de abrir múltiples aplicaciones bancarias y planillas de cálculo para intentar responder una pregunta simple: ¿cuál es mi situación financiera hoy?
            </p>
          </div>
        </div>

        {/* Minimal 3-Column Highlights Strip */}
        <div className="landing-about-highlights">
          {highlights.map((item) => (
            <div key={item.number} className="landing-about-highlight-item">
              <span className="landing-about-highlight-num">{item.number}</span>
              <h3 className="landing-about-highlight-title">{item.title}</h3>
              <p className="landing-about-highlight-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
