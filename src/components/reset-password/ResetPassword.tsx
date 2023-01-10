import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import stylesResetPassword from "./reset-password.module.css";
import { NameInput } from "../register-list/name-input/NameInput";
import { Password } from "../register-list/password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/profile";
import { checkReponse } from "../../utils/refreshToken";
import { TLocationState } from "../../services/types/location";
import { useForm } from "../../hooks/useForm";

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const location = useLocation<TLocationState>();
  const { isLogin } = useSelector((state: any) => state.profileReducer);

  const { values, handleChange, setValues } = useForm({
    code: "",
    password: "",
  });

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
        password: values.password,
        token: values.code,
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
            onChange={handleChange}
            value={values.password}
            name={"password"}
          />
          <NameInput
            placeholder="Введите код из письма"
            onChange={handleChange}
            value={values.code}
            name={"code"}
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
};

export default ResetPassword;
