import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalHeader from "./modal-header/ModalHeader";
import styleModal from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

interface IModal {
  header: string;
  onClose: any;
  children: React.ReactNode; 
}

function Modal({ header, onClose, children }: IModal) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return ReactDOM.createPortal(
    <>
      <div className={styleModal.modal}>
        <ModalHeader header={header} onClose={onClose}></ModalHeader>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}

// Modal.propTypes = {
//   header: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.element.isRequired,
// };

export default Modal;
