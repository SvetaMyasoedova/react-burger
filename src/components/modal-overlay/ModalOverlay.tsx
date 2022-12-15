import PropTypes from "prop-types";
import styleModalOverlay from "./modal-overlay.module.css";

type TModalOverlay = {
  onClose: any
}

function ModalOverlay({ onClose}: TModalOverlay) {
  return <div onClick={onClose} className={styleModalOverlay.overlay}></div>;
}

// ModalOverlay.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

export default ModalOverlay;
