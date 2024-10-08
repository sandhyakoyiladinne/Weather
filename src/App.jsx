import { useState } from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiKey = '90361915a9939baf51d746c901a893f1';

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <header>
        <h1>Weather Application</h1>
      </header>
      <main>
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <Weather apiKey={apiKey} />
            <Forecast apiKey={apiKey} />
          </>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Weather Application</p>
      </footer>
    </div>
  );
}

export default App;
