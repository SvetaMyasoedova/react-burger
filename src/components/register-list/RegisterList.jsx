import { useState } from "react";
import stylesRegister from "./register-list.module.css";

import { Link } from "react-router-dom";

import AppHeader from "../app-header/AppHeader";
import { NameInput } from "./name-input/NameInput";
import { Password } from "./password-input/Password";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterList() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleNewUser = () => {
    fetch(" https://norma.nomoreparties.space/api/auth/register", {
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
        email: email,
        password: password,
        name: userName,
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
        console.log('NewUser' + res)
        if (res && res.success) {
         
        }
      });
  };
  return (
    <div>
      <div className="mb-30">
        <AppHeader />
      </div>

      <div className={`${stylesRegister.main} mb-10`}>
        <p className="text text_type_main-medium">Регистрация</p>
      </div>
      <div className={`${stylesRegister.input} mb-5`}>
        <NameInput placeholder='Имя' onChange={onChangeUserName} value={userName}/>
         <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={"email"}
        isIcon={false}
      />
        <Password onChange={onChangePassword} value={password}/>
      </div>
      <div className={`${stylesRegister.button} mb-20`}>
        <Button onClick={handleNewUser} htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>
      <p
        className={` ${stylesRegister.text} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
}

export default RegisterList;
