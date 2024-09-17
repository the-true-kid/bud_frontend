import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputField from '../components/InputField';
import Button from '../components/Button';
import useRegister from '../hooks/useRegister'; // Import the custom hook

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const { handleRegister, loading, error } = useRegister(); // Destructure the hook
  const navigate = useNavigate(); // Define navigate in the component

  const onRegister = () => {
    handleRegister({ username, email, password, confirmPassword, location, navigate }); // Pass navigate to the hook
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <InputField label="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <Button label={loading ? 'Registering...' : 'Register'} onClick={onRegister} disabled={loading} />
      <Button label="Back to Login" onClick={() => navigate('/')} />
    </div>
  );
};

export default Register;
