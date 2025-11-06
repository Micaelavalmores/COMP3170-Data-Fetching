import React, { useState } from 'react';
import Modal from './Modal';
import BookForm from './BookForm';

function AddButton() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button className="AddButton" type="button" onClick={openModal}>
        Add
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BookForm onSubmit={closeModal} />
      </Modal>
    </>
  );
}

export default AddButton;
