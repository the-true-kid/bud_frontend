import { useState } from 'react';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async ({ username, email, password, confirmPassword, location, navigate }) => {
    setError(''); // Clear previous errors

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Indicate loading state

    try {
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

      const data = await response.json();

      if (response.ok) {
        navigate('/'); // Navigate to login page on successful registration
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { handleRegister, loading, error };
};

export default useRegister;
