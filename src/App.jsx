import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Errore nel recupero dati:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="App" style={{ padding: '1rem', maxWidth: '400px' }}>
      <h1>Cerca</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="cerca nei prodotti"
        style={{ width: '100%', padding: '0.5rem' }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            background: '#fff',
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id}
              style={{
                padding: '0.5rem',
                borderBottom: '1px solid #eee',
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
