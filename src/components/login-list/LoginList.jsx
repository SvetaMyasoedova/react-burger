import { Link, Redirect } from "react-router-dom";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import stylesLogin from "./login-list.module.css";

import AppHeader from "../app-header/AppHeader";

import { Password } from "../register-list/password-input/Password";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import getLogin from "../../services/actions/login";

function LoginList() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.profileReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(getLogin(email, password));
  };

  if (isLogin) {
    return <Redirect to={Redirect.state?.from || "/"} />;
  }

  return (
    <div>
      <div className={`${stylesLogin.main} mt-30 mb-10`}>
        <p className="text text_type_main-medium">Вход</p>
      </div>
      <div className={`${stylesLogin.input} mb-5`}>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
        />
        <Password onChange={onChangePassword} value={password} />
      </div>
      <div className={`${stylesLogin.button} mb-20`}>
        <Button
          onClick={handleLogin}
          htmlType="button"
          type="primary"
          size="large"
        >
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
