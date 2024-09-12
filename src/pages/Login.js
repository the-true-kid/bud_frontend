// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext for login state
import InputField from '../components/InputField'; // Assuming you have this component
import Button from '../components/Button'; // Assuming you have this component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext); // Get the login function from the context
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const success = await login(email, password); // Call login function from context
      if (success) {
        navigate('/garden'); // Redirect to the garden view after successful login
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default Login;
