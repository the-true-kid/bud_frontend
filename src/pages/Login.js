import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext for login state
import InputField from '../components/InputField'; // Assuming you have this component
import Button from '../components/Button'; // Assuming you have this component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state to display error messages
  const { login } = useContext(UserContext); // Get the login function from the context
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Reset error message
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true); // Set loading to true while processing
    try {
      const success = await login(email, password); // Call login function from context
      if (success) {
        navigate('/garden'); // Redirect to the garden view after successful login
      } else {
        setError('Login failed. Please check your credentials.'); // Display error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state after login attempt
    }
  };

  // Function to navigate to the new user registration page
  const handleCreateNewUser = () => {
    navigate('/register'); // Assuming '/register' is the route for creating a new user
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      <InputField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button label={loading ? 'Logging in...' : 'Login'} onClick={handleLogin} disabled={loading} /> {/* Disable button during loading */}
      {/* Add a button to navigate to create a new user */}
      <Button label="Create New User" onClick={handleCreateNewUser} />
    </div>
  );
};

export default Login;
