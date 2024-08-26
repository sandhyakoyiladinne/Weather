import { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPage.css'; // Ensure you have styles for the login page

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login

  // Use local storage to simulate storing user data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if signup or login
    if (isSignup) {
      // Handle signup
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      alert('Signup successful. You can now log in.');
      setIsSignup(false); // Switch to login after signup
    } else {
      // Handle login
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        onLogin(); // Call onLogin from props
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email : 
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password : 
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
