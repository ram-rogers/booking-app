// Login.js

import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        setError("")

        if (!username.trim() || !password.trim()) {
            setError('Both username and password are required.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                'Password must contain 8 characters,one uppercase, one lowercase, one special character, and one number.'
            );
            console.log(error)
            return;
        };

        if (username && password) {
            navigate("/home")
        }
    }
    return (
        <div className="container">
            <div className="card">
                <h3>Account Login</h3>
                <p className='error'>{error}</p>

                <form>
                    <div className="form-group">
                        <label htmlFor='username'>Username</label>
                        <input type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
