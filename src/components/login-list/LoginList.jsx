import stylesLogin from "./login-list.module.css";

import AppHeader from "../app-header/AppHeader";
import { Email } from "../register-list/email-input/Email";

import { Password } from "../register-list/password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function LoginList() {
	return (
		<div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesLogin.main} mb-10`}>
        <p className="text text_type_main-medium">Вход</p>
      </div>
      <div className={`${stylesLogin.input} mb-5`}>
       
        <Email />
        <Password />
      </div>
		<div className={`${stylesLogin.button} mb-20`}>
		<Button  htmlType="button" type="primary"   size="large">
          Войти
        </Button>
		</div >
		<div className={` ${stylesLogin.text} text text_type_main-default text_color_inactive`}>
		<p  >Вы новый пользователь? <a href="#"> Зарегистрироваться</a> </p>
		<p  >Забыли пароль? <a href="#"> Восстановить пароль</a> </p>
		</div>
		
		
    </div>
	)

}

export default LoginList;