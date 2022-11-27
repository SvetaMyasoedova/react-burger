import { Link } from "react-router-dom";
import { useState } from "react";
import stylesResetPassword from "./reset-password.module.css";

import AppHeader from "../app-header/AppHeader";
import { NameInput } from "../register-list/name-input/NameInput";
import { Password } from "../register-list/password-input/Password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  const [code, setCode] = useState("");
  
  const [password, setPassword] = useState("");

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
 
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordReset = () => {
    fetch("  https://norma.nomoreparties.space/api/password-reset/reset", {
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
        token: code
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
         
        }
      });
  };
  return (
    <div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesResetPassword.main} mb-10`}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
      <div className={`${stylesResetPassword.input} mb-5`}>
        <Password placeholder="Введите новый пароль" onChange={onChangePassword} value ={password}/>
        <NameInput placeholder="Введите код из письма" onChange={onChangeCode} value ={code}/>
      </div>
      <div className={`${stylesResetPassword.button} mb-20`}>
        <Button
          onClick={handlePasswordReset}
          htmlType="button"
          type="primary"
          size="large"
        >
          Сохранить
        </Button>
      </div>
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
