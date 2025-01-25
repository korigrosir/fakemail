import { useState } from 'react';

export default function Home() {
  const [tempEmail, setTempEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/email');
      const data = await res.json();

      if (res.ok) {
        // Menyimpan email yang diterima dari API
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Temporary Email Generator</h1>
      <button onClick={generateEmail} style={{ padding: '10px 20px', fontSize: '16px' }} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Email'}
      </button>
      {tempEmail && (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Your Temporary Email: <strong>{tempEmail}</strong>
        </p>
      )}
    </div>
  );
  }
