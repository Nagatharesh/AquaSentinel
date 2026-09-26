import { useState, useEffect } from 'react';
import { getDatabase } from '../db/sqliteClient';

/**
 * React Custom Hook for querying in-browser SQLite WASM database
 */
export function useSQLite() {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDatabase()
      .then(instance => {
        setDb(instance);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const executeQuery = (sqlQuery) => {
    if (!db) return [];
    try {
      const res = db.exec(sqlQuery);
      return res;
    } catch (err) {
      console.error('SQL Execution Error:', err);
      throw err;
    }
  };

  return { db, loading, error, executeQuery };
}
