import stylesForgotPassword from './forgot-password.module.css'

import AppHeader from "../app-header/AppHeader";

import { Link } from "react-router-dom";
import { Email } from "../register-list/email-input/Email";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
	
	return (
		<>
	
    <div className="mb-30">
      <AppHeader />
    </div>

    <div className={`${stylesForgotPassword.main} mb-10`}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
    </div>
    <div className={`${stylesForgotPassword.input} mb-5`}>
      <Email />
    </div>
    <div className={`${stylesForgotPassword.button} mb-20`}>
      <Button htmlType="button" type="primary" size="large">
        Восстановить
      </Button>
    </div>
    <div
      className={` ${stylesForgotPassword.text} text text_type_main-default text_color_inactive`}
    >
      <p>
        Вспомни пароль? <Link to="/login"> Войти</Link>
      </p>
    </div>
  </>
	)
  
	
	
}

export default ForgotPassword;
