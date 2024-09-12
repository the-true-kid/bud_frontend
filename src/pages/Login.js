import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Access login function from context

  const handleLogin = async () => {
    if (username && email && password) {
      try {
        // Call the login function from UserContext (which calls the backend API)
        const success = await login(username, email, password);
        if (success) {
          navigate('/garden'); // Redirect to Garden view on success
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default Login;
