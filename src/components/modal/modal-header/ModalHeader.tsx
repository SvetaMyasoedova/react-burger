import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleModalHeader from "./modal-header.module.css";
import { IModal } from "../Modal";



export type THeader = Omit<IModal, 'children'> 

function ModalHeader({ onClose, header}: THeader) {
  return (
    <div className={`${styleModalHeader.header} pl-10 pr-10 pt-10`}>
      <div className="text text_type_main-large">{header}</div>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
}

// ModalHeader.propTypes = {
//   header: PropTypes.string,
//   onClose: PropTypes.func,
// };

export default ModalHeader;
