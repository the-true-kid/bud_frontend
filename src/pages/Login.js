// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext for login state
import InputField from '../components/InputField'; // Assuming you have this component
import Button from '../components/Button'; // Assuming you have this component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useContext(UserContext); // Get the login function from the context
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Set loading to true while processing
    try {
      const success = await login(email, password); // Call login function from context
      if (success) {
        navigate('/garden'); // Redirect to the garden view after successful login
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false); // Reset loading state after login attempt
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button label={loading ? 'Logging in...' : 'Login'} onClick={handleLogin} disabled={loading} /> {/* Disable button during loading */}
    </div>
  );
};

export default Login;
