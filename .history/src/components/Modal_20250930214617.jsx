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
      }}
      onClick={onBackgroundClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          minWidth: '320px',
          maxWidth: '90%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
