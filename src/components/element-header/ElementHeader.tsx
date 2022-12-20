// import PropTypes from 'prop-types';
import { FC } from "react";
import stylesElement from "./element-header.module.css";

interface IHeader {
  icon: JSX.Element;
  text: string;
}

const ElementHeader:FC<IHeader> = ({ icon, text }) => {
  return (
    <div className={`${stylesElement.main} p-2`}>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

// ElementHeader.propTypes = {
//   icon: PropTypes.element.isRequired,
//   text: PropTypes.string.isRequired,
// };

export default ElementHeader;
