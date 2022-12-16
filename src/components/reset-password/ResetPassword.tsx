import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import stylesResetPassword from "./reset-password.module.css";

import { NameInput } from "../register-list/name-input/NameInput";
import { Password } from "../register-list/password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/profile";
import { checkReponse } from "../../utils/refreshToken";
import { TLocationState } from "../../services/types/location";

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const location = useLocation<TLocationState>();
  const { isLogin } = useSelector((state: any) => state.profileReducer);
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          history.push("/login");
        }
      });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (history.location.state === undefined) {
    return <Redirect to="/" />;
  }

  if (history.location?.state?.from !== "/forgot-password") {
    return <Redirect to="/" />;
  }

  if (isLogin) {
    return <Redirect to={location?.state?.from || "/"} />;
  }
  return (
    <div>
      <div className={`${stylesResetPassword.main} mt-30 mb-10`}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>

      <form onSubmit={handlePasswordReset}>
        <div className={`${stylesResetPassword.input} mb-5`}>
          <Password
            placeholder="Введите новый пароль"
            onChange={onChangePassword}
            value={password}
          />
          <NameInput
            placeholder="Введите код из письма"
            onChange={onChangeCode}
            value={code}
          />
        </div>
        <div className={`${stylesResetPassword.button} mb-20`}>
          <Button
            // onClick={handlePasswordReset}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Сохранить
          </Button>
        </div>
      </form>

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
