import { useEffect, FC } from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./modal-header/ModalHeader";
import styleModal from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

export interface IModal {
  header?: string;
  onClose: () => void;
  children: React.ReactNode; 
}

const Modal: FC<IModal> = ({ header, onClose, children }) => {
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



export default Modal;
