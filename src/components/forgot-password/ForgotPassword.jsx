import { useState, useEffect } from "react";

import stylesForgotPassword from "./forgot-password.module.css";

import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/profile";

import { checkReponse } from "../../utils/refreshToken";

function ForgotPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.profileReducer);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    fetch("https://norma.nomoreparties.space/api/password-reset", {
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
        email: value,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          history.push("/reset-password", { from: "/forgot-password" });
        }
      });
  };

  if (isLogin) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <>
      <div className={`${stylesForgotPassword.main} mt-30 mb-10`}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
      <form onSubmit={handlePasswordRecovery}>
        <div className={`${stylesForgotPassword.input} mb-5`}>
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className={`${stylesForgotPassword.button} mb-20`}>
          <Button
            // onClick={handlePasswordRecovery}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Восстановить
          </Button>
        </div>
      </form>

      <div
        className={` ${stylesForgotPassword.text} text text_type_main-default text_color_inactive`}
      >
        <p>
          Вспомни пароль? <Link to="/login"> Войти</Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
