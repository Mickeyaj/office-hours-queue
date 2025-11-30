import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login({ role }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState('false');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            if (isSignUp) {
                await signup(email, password);
            } else {
                await login(email, password);
            }

            navigate(role === 'professor' ? '/professor' : '/student');
        } catch (error) {
            console.error('Auth error', error);
            setError(error.message);
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <h2>{isSignUp ? 'Sign Up' : 'Login'} as {role === 'professor' ? 'Professor' : 'Student'}</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
                </button>
            </form>

            <p className="toggle-auth">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button className="link-btn" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Login' : 'Sign Up'}
                </button>
            </p>

            <button className="back-btn" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
}

export default Login;