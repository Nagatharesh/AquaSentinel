import React, { useState } from 'react';
import { useSQLite } from '../../hooks/useSQLite';
import './QueryConsole.css';

export function QueryConsole() {
  const { loading, executeQuery } = useSQLite();
  const [query, setQuery] = useState('SELECT * FROM models_metadata;');
  const [results, setResults] = useState(null);

  const handleRunQuery = () => {
    if (!query) return;
    try {
      const res = executeQuery(query);
      setResults(res);
    } catch (err) {
      alert('SQL Error: ' + err.message);
    }
  };

  return (
    <div className="query-console-card">
      <div className="query-input-group">
        <textarea 
          className="query-textarea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL query..."
        />
        <button 
          className="query-execute-btn"
          onClick={handleRunQuery}
          disabled={loading}
        >
          Execute
        </button>
      </div>

      {results && results.length > 0 && (
        <table className="query-results-table">
          <thead>
            <tr>
              {results[0].columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results[0].values.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((val, cIdx) => (
                  <td key={cIdx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
