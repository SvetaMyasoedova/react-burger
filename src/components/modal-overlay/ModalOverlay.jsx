import PropTypes from "prop-types";
import styleModalOverlay from "./modal-overlay.module.css";

function ModalOverlay({ onClose }) {
  return <div onClick={onClose} className={styleModalOverlay.overlay}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
