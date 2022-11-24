import { useState, useRef } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const NameInput = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <Input
      type={"text"}
      placeholder={"Имя"}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      name={"name"}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={"Ошибка"}
      size={"default"}
      extraClass="ml-1"
    />
  );
};
