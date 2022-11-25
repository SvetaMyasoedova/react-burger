import { useState } from "react";

import stylesForgotPassword from "./forgot-password.module.css";

import AppHeader from "../app-header/AppHeader";

import { Link, useHistory } from "react-router-dom";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";


function ForgotPassword() {
  const history = useHistory();
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handlePasswordRecovery = () => {
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res && res.success) {
          history.push("/reset-password");
        }
      });
  };

  return (
    <>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesForgotPassword.main} mb-10`}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
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
          onClick={handlePasswordRecovery}
          htmlType="button"
          type="primary"
          size="large"
        >
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
  );
}

export default ForgotPassword;
