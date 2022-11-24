import stylesRegister from "./register-list.module.css";

import { Link } from "react-router-dom";

import AppHeader from "../app-header/AppHeader";
import { Email } from "./email-input/Email";
import { NameInput } from "./name-input/NameInput";
import { Password } from "./password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterList() {
  console.log("RegisterList");
  return (
    <div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesRegister.main} mb-10`}>
        <p className="text text_type_main-medium">Регистрация</p>
      </div>
      <div className={`${stylesRegister.input} mb-5`}>
        <NameInput />
        <Email />
        <Password />
      </div>
      <div className={`${stylesRegister.button} mb-20`}>
        <Button htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>
      <p
        className={` ${stylesRegister.text} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
}

export default RegisterList;
