import PropTypes from 'prop-types';
import stylesElement from "./element-header.module.css";


function ElementHeader({ icon, text }) {
  return (
    <div className={`${stylesElement.main} p-2`}>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

ElementHeader.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
}; 

export default ElementHeader;
