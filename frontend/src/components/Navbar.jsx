import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h2>ADM</h2>
        </Link>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
        </li>
        <li>
          <Link to="/presupuesto" style={{ textDecoration: 'none', color: 'inherit' }}>Presupuesto</Link>
        </li>
      </ul>

      <button className="boton-sketch">NUEVO GASTO</button>
    </nav>
  )
}