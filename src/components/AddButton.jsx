import React, { useState } from 'react';
import Modal from './Modal';
import BookForm from './BookForm';

function AddButton({ onAddBook }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (bookData) => {
    onAddBook(bookData);
    closeModal();
  };

  return (
    <>
      <button className="AddButton" type="button" onClick={openModal}>
        Add
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BookForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default AddButton;