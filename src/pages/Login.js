import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder logic for login validation
    if (username && email && password) {
      navigate('/garden'); // Redirect to Garden View
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
