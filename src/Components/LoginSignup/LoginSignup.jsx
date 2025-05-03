import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/user.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const LoginSignup = ({ onLogin }) => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const endpoint = action === "Login" ? '/login' : '/register';
            const body = action === "Login" 
                ? { email: formData.email, password: formData.password }
                : { username: formData.username, email: formData.email, password: formData.password };

            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials: 'include' // Important for sessions/cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            if (action === "Login") {
                onLogin(data.user);
            } else {
                alert('Registration successful! Please login.');
                setAction("Login");
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
            console.error('API Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const switchAction = () => {
        setAction(prevAction => prevAction === "Login" ? "Sign Up" : "Login");
        setError('');
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User icon" />
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Name" 
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                
                <div className="input">
                    <img src={email_icon} alt="Email icon" />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>
                
                <div className="input">
                    <img src={password_icon} alt="Password icon" />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        autoComplete={action === "Login" ? "current-password" : "new-password"}
                    />
                </div>
                
                <div className="submit-container">
                    <button 
                        type="button"
                        className={action === "Login" ? "submit gray" : "submit"} 
                        onClick={switchAction}
                        disabled={isLoading}
                    >
                        {action === "Login" ? "Sign Up" : "Login"}
                    </button>
                    
                    <button 
                        type="submit"
                        className={action === "Sign Up" ? "submit gray" : "submit"} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : action}
                    </button>
                </div>
            </form>
            
            {action === "Login" && (
                <div className="forgot-password">
                    Lost Password? <span>Click here</span>
                </div>
            )}
        </div>
    );
};

export default LoginSignup;