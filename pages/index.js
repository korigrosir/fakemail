import { useState } from 'react';
import styles from '../styles/Home.module.css';  // Import CSS module

export default function Home() {
  const [tempEmail, setTempEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/email');
      const data = await res.json();

      if (res.ok) {
        setTempEmail(data.email);
      } else {
        alert('Failed to generate email: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Temporary Email Generator</h1>
      <button
        onClick={generateEmail}
        className={styles.button}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Email'}
      </button>
      {tempEmail && (
        <p className={styles.emailText}>
          Your Temporary Email: <span className={styles.email}>{tempEmail}</span>
        </p>
      )}
    </div>
  );
        }
