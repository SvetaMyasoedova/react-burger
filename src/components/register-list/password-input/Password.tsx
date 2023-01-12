import { FC } from "react";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesPassword from "./password.module.css";
import { IInput } from "../../../services/types/input";

export const Password: FC<IInput> = ({ placeholder, onChange, value, icon, name }) => {
  return (
    <div className={stylesPassword.main}>
      <PasswordInput
        onChange={onChange}
        value={value}
        icon={icon}
        name={name}
        extraClass="mb-2"
        placeholder={placeholder}
      />
    </div>
  );
};


