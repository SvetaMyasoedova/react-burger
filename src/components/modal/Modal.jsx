import  ReactDOM from "react-dom";
import ModalHeader from "./modal-header/ModalHeader";
import styleModal from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";

const modalRoot = document.getElementById("modal-root");

function Modal({ header, onClose, children }) {
  return ReactDOM.createPortal(
    <>
      <div className={styleModal.modal}>
        <ModalHeader header = {header} onClose={onClose}></ModalHeader>
        {children}
      </div>
		<ModalOverlay onClose={onClose}/>
      
    </>,
    modalRoot
  );
}

export default Modal;
