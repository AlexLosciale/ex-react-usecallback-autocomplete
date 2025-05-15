import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        setError(null);
        return;
      }

      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
          );
          if (!res.ok) {
            throw new Error(`Errore del server: ${res.status}`);
          }
          const data = await res.json();
          setSuggestions(data);
        } catch (err) {
          setSuggestions([]);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="app-container">
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products"
        className="search-input"
      />
      {loading && <p>Caricamento...</p>}
      {error && <p className="error-message">Errore: {error}</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li key={item.id} className="suggestion-item">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
