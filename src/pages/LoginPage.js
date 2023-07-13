import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, role } = await login(username, password);

            // Store the token and role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Navigate to the appropriate page based on user role
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'user') {
                navigate('/user');
            } else {
                // Handle other roles or scenarios
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleRegisterClick = () => {
        // Implement the logic to handle the "Belum memiliki akun? Klik disini" action
        // This can be redirecting to the registration page or showing a registration form within the same page
        navigate('/register'); // Ganti '/register' dengan rute ke halaman pendaftaran yang sesuai
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                    </div>
                </div>
                <button type="submit">Login</button>
                <p className="register-link" onClick={handleRegisterClick}>
                    Belum punya akun? <a href="/register">Klik</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
