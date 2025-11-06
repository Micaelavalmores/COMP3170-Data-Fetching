
import { useRef } from 'react';

function Modal({ btnLabel, children, btnClassName }) {
    const modalRef = useRef();
    
    function openModal() {
        modalRef.current.showModal();
    }
    return (
        <>
            <button onClick={openModal} className={btnClassName} >{btnLabel}</button>
            <dialog ref={modalRef}>
                {children}
            </dialog>
        </>
    )
}
export default Modal;
