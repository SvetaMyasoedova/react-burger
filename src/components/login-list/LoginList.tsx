import { Link, Redirect, useLocation } from "react-router-dom";
import {  FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import stylesLogin from "./login-list.module.css";
import { Password } from "../register-list/password-input/Password";
import { TLocationState } from "../../services/types/location";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import getLogin from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";

const LoginList: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const { isLogin } = useSelector((state: any) => state.profileReducer);

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getLogin(values.email, values.password));
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
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
          />
          <Password onChange={handleChange} value={values.password} name= {"password"}/>
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
};

export default LoginList;
