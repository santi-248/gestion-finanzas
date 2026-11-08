import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario'));

  const iniciarSesion = (nuevoToken, email) => {
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', email);
    setToken(nuevoToken);
    setUsuario(email);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  const value = useMemo(
    () => ({
      token,
      usuario,
      autenticado: Boolean(token),
      iniciarSesion,
      cerrarSesion,
    }),
    [token, usuario],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return contexto;
}
