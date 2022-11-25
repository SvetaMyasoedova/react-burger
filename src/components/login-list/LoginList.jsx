import { Link } from "react-router-dom";
import { useState } from "react";
import stylesLogin from "./login-list.module.css";

import AppHeader from "../app-header/AppHeader";

import { Password } from "../register-list/password-input/Password";
import { Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

function LoginList() {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesLogin.main} mb-10`}>
        <p className="text text_type_main-medium">Вход</p>
      </div>
      <div className={`${stylesLogin.input} mb-5`}>
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        isIcon={false}
      />
        <Password />
      </div>
      <div className={`${stylesLogin.button} mb-20`}>
        <Button htmlType="button" type="primary" size="large">
          Войти
        </Button>
      </div>
      <div
        className={` ${stylesLogin.text} text text_type_main-default text_color_inactive`}
      >
        <p>
          Вы новый пользователь? <Link to="/register"> Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginList;
