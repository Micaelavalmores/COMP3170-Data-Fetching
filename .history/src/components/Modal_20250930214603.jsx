import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const onBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

}

export default Modal;
