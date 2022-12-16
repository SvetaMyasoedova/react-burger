import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesLogin from "./login-list.module.css";
import { Password } from "../register-list/password-input/Password";
import { TLocationState } from "../../services/types/location";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import getLogin from "../../services/actions/login";

const LoginList: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const { isLogin } = useSelector((state: any) => state.profileReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getLogin(email, password));
  };

  if (isLogin) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <div>
      <div className={`${stylesLogin.main} mt-30 mb-10`}>
        <p className="text text_type_main-medium">Вход</p>
      </div>
      <form onSubmit={handleLogin}>
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
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>

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
