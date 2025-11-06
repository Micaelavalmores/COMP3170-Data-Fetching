

// function AddButton () {
//     return (
//         <button className="AddButton" type="button" value="Add more">Add</button>
//     );
// }

import { useRef } from 'react';

function AddButton({ btnLabel, children, btnClassName }) {
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
;

export default AddButton;