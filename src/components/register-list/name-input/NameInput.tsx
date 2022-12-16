import {  useRef, FC } from "react";
// import PropTypes from "prop-types";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { IInput } from "../../../services/types/input";

export const NameInput: FC<IInput> = ({placeholder, onChange, value, icon}) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef?.current?.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <Input
      type={"text"}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={"name"}
      icon={icon}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={"Ошибка"}
      size={"default"}
      extraClass="ml-1"
    />
  );
};

// NameInput.propTypes = {
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
//   icon: PropTypes.string,
// };
