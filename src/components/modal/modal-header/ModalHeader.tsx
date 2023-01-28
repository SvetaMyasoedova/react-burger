import { FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleModalHeader from "./modal-header.module.css";
import { IModal } from "../Modal";



export type THeader = Omit<IModal, 'children'> 

const ModalHeader: FC<THeader> =({ onClose, header}) => {
  return (
    <div className={`${styleModalHeader.header} pl-10 pr-10 pt-10`}>
      <div className="text text_type_main-large">{header}</div>
      <div data-test-id='modal-close-icon'><CloseIcon type="primary" onClick={onClose} /> </div>
    </div>
  );
}



export default ModalHeader;
