import { Link } from "react-router-dom";

import stylesResetPassword from "./reset-password.module.css"

import AppHeader from "../app-header/AppHeader";
import { NameInput } from "../register-list/name-input/NameInput";
import { Password } from "../register-list/password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";


function ResetPassword() {
  return (
    <div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesResetPassword.main} mb-10`}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
      <div className={`${stylesResetPassword.input} mb-5`}>
		<Password  placeholder="Введите новый пароль"/>
		  <NameInput placeholder="Введите код из письма"/>
        
      </div>
      <div className={`${stylesResetPassword.button} mb-20`}>
        <Button htmlType="button" type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <div
        className={` ${stylesResetPassword.text} text text_type_main-default text_color_inactive`}
      >
        <p>
          Вспомнили пароль? <Link to="/login"> Войти</Link>
        </p>
        
      </div>
    </div>
  );
}

export default ResetPassword;
