import stylesElement from "./element-header.module.css";

function ElementHeader({ icon, text }) {
  return (
    <div className={stylesElement.main}>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default ElementHeader;
