import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MenuUsuario({ variante = 'sketch' }) {
  const { usuario, cerrarSesion } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);
  const navigate = useNavigate();
  const panelId = useId();
  const inicial = (usuario || '?').trim().charAt(0).toUpperCase();

  useEffect(() => {
    if (!abierto) return undefined;

    const cerrarSiEsAfuera = (event) => {
      if (!contenedor.current?.contains(event.target)) {
        setAbierto(false);
      }
    };

    const cerrarConEscape = (event) => {
      if (event.key === 'Escape') setAbierto(false);
    };

    document.addEventListener('mousedown', cerrarSiEsAfuera);
    document.addEventListener('keydown', cerrarConEscape);
    return () => {
      document.removeEventListener('mousedown', cerrarSiEsAfuera);
      document.removeEventListener('keydown', cerrarConEscape);
    };
  }, [abierto]);

  const salir = () => {
    cerrarSesion();
    setAbierto(false);
    navigate('/');
  };

  return (
    <div className={`menu-usuario menu-usuario-${variante}`} ref={contenedor}>
      <button
        type="button"
        className="menu-usuario-boton"
        aria-haspopup="dialog"
        aria-expanded={abierto}
        aria-controls={panelId}
        aria-label={usuario ? `Sesión de ${usuario}` : 'Sesión iniciada'}
        onClick={() => setAbierto((prev) => !prev)}
      >
        {inicial}
      </button>

      {abierto && (
        <div className="menu-usuario-panel" id={panelId} role="dialog" aria-label="Sesión actual">
          <p className="menu-usuario-etiqueta">Sesión iniciada</p>
          <p className="menu-usuario-email">{usuario || 'Usuario'}</p>
          <button type="button" className="menu-usuario-salir" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
