import styleModalOverlay from "./modal-overlay.module.css";

function ModalOverlay({onClose}) {


  return <div onClick={onClose} className={styleModalOverlay.overlay}></div>;
}

export default ModalOverlay;
