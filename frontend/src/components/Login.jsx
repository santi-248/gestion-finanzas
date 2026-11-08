import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axiosConfig';

const Login = () => {
    const [mensaje, setMensaje] = useState('');

    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // 1. Google nos devuelve su credencial y se la mandamos a nuestro AuthController de Spring Boot
            const response = await api.post('/auth/google', {
                token: credentialResponse.credential
            });

            // 2. Spring Boot lo valida, crea/busca al usuario y nos devuelve NUESTRO token JWT
            const jwtToken = response.data.token;
            const email = response.data.email;

            // 3. Guardamos el token en el navegador (el interceptor lo usará automáticamente)
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('usuario', email);

            setMensaje(`¡Bienvenido ${email}! Login exitoso.`);

            navigate('/dashboard');

        } catch (error) {
            console.error("Error validando en el backend:", error);
            setMensaje('Error al intentar iniciar sesión en el servidor.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Gestión de Finanzas</h2>
                <p>Iniciá sesión para continuar</p>

                <div style={styles.buttonContainer}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setMensaje('El popup de Google falló o fue cerrado.')}
                        theme="filled_blue"
                        shape="pill"
                        text="signin_with"
                    />
                </div>

                {mensaje && (
                    <p style={{ marginTop: '1rem', color: mensaje.includes('Error') ? 'red' : 'green' }}>
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
};

// Unos estilos básicos en línea para que no se vea feo mientras arman el CSS real
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1.5rem'
    }
};

export default Login;