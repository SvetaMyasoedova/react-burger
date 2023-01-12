import { FC } from "react";
import styleModalOverlay from "./modal-overlay.module.css";
import { THeader } from "../modal/modal-header/ModalHeader";

type TModalOverlay = Omit<THeader, 'header'> 

const ModalOverlay: FC<TModalOverlay> = ({ onClose}) => {
  return <div onClick={onClose} className={styleModalOverlay.overlay}></div>;
}


export default ModalOverlay;
