import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Presupuesto from './components/Presupuesto';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function VistaSistema({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '0 20px 40px' }}>{children}</main>
    </>
  );
}

function RutaProtegida({ children }) {
  const { autenticado } = useAuth();
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <RutaProtegida>
                  <VistaSistema>
                    <Dashboard />
                  </VistaSistema>
                </RutaProtegida>
              }
            />
            <Route
              path="/presupuesto"
              element={
                <RutaProtegida>
                  <VistaSistema>
                    <Presupuesto />
                  </VistaSistema>
                </RutaProtegida>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
