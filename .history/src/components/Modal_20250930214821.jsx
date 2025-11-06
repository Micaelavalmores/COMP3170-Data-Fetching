import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const onBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      onClick={onBackgroundClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '50px 36px',
          minWidth: '320px',
          maxWidth: '90%',
          boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  );
  
  
}

export default Modal;
