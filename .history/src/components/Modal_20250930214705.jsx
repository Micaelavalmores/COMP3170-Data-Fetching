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
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
      onClick={onBackgroundClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '36px 40px',
          minWidth: '360px',
          maxWidth: '90%',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
          boxSizing: 'border-box',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
  
}

export default Modal;
