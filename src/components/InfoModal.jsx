import 'bootstrap/dist/css/bootstrap.min.css';

const InfoModal = ({ show, onClose, title, message, buttonText = 'OK', onButtonClick }) => {
  if (!show) return null;
  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px 30px',
          borderRadius: '8px',
          width: '320px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <h4 style={{ marginBottom: '15px', fontWeight: '600', color: '#333' }}>{title}</h4>
        <p style={{ marginBottom: '25px', color: '#555', fontSize: '14px', lineHeight: '1.4' }}>{message}</p>

        <button
          onClick={onButtonClick || onClose}
          style={{
            width: '100%',
            padding: '10px 0',
            backgroundColor: '#ba815f', // your theme's brownish button color
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a36e4a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ba815f')}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default InfoModal;
