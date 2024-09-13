import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; // Assuming this exists
import Button from '../components/Button'; // Assuming this exists

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Log the input data to check what's being captured
    console.log('Form Data:', { username, email, password, confirmPassword, location });

    // Basic validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Log before sending the request
      console.log('Sending request to /api/users');

      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          location,
        }),
      });

      // Log the raw response to debug the status and headers
      console.log('Response:', response);

      // Check if the response is in JSON format
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        alert('Registration successful!');
        navigate('/'); // Redirect to login page after registration
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error); // Log any errors that occur during fetch
    }
  };

  // Function to navigate back to login page
  const handleBackToLogin = () => {
    navigate('/'); // Assuming '/' is your login page route
  };

  return (
    <div>
      <h1>Register</h1>
      <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <InputField label="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <Button label="Register" onClick={handleRegister} />
      {/* Add a button to go back to the login page */}
      <Button label="Back to Login" onClick={handleBackToLogin} />
    </div>
  );
};

export default Register;
