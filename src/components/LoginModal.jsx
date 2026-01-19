import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
        }}
      />

      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: '2rem 2.5rem',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgb(149 157 165 / 0.2)',
          width: '90%',
          maxWidth: '400px',
          zIndex: 1000,
          fontFamily: "'Poppins', sans-serif",
          textAlign: 'center',
        }}
      >
        <h3 style={{ marginBottom: '0.75rem', color: '#333', fontWeight: '600' }}>Login Required</h3>
        <p style={{ color: '#555', fontSize: '1rem', marginBottom: '1.5rem' }}>You need to be logged in to perform this action.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '2px solid #c9966d',
              borderRadius: '6px',
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#c9966d',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = '#c9966d'), (e.currentTarget.style.color = '#fff'))}
            onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = 'transparent'), (e.currentTarget.style.color = '#c9966d'))}
          >
            Cancel
          </button>

          <button
            onClick={handleLogin}
            style={{
              background: '#c9966d',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#fff',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b5834f')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c9966d')}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
