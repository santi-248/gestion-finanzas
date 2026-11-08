import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Componentes
import Login from './components/Login';
// import Landing from './components/Landing'; // Josefina descomentará esto
// import Dashboard from './components/Dashboard'; // Para las HU del Sprint 2

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal: La Landing Page que ya tienen */}
          <Route path="/" element={
            <div>Acá Josefina va a colocar el componente Landing</div>
          } />

          {/* Ruta de autenticación: Nuestro botón de Google */}
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida: El panel de finanzas */}
          <Route path="/dashboard" element={
            <div>Acá va el Dashboard del Sprint 2</div>
          } />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;