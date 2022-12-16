import PropTypes from "prop-types";
import styleModalOverlay from "./modal-overlay.module.css";
import { THeader } from "../modal/modal-header/ModalHeader";

type TModalOverlay = Omit<THeader, 'header'> 

function ModalOverlay({ onClose}: TModalOverlay) {
  return <div onClick={onClose} className={styleModalOverlay.overlay}></div>;
}

// ModalOverlay.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

export default ModalOverlay;
