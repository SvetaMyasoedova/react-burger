import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesRegister from "./register-list.module.css";
import getRegister from "../../services/actions/register";
import { getUser } from "../../services/actions/profile";

import { Link, Redirect } from "react-router-dom";

import AppHeader from "../app-header/AppHeader";
import { NameInput } from "./name-input/NameInput";
import { Password } from "./password-input/Password";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterList() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.profileReducer);

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

  const handleNewUser = (e) => {
    e.preventDefault();
    dispatch(getRegister(email, password, userName));
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLogin) {
    return <Redirect to={Redirect.state?.from || "/"} />;
  }

  return (
    <div>
      <div className={`${stylesRegister.main} mt-30 mb-10`}>
        <p className="text text_type_main-medium">Регистрация</p>
      </div>
      <form onSubmit={handleNewUser}>
        <div className={`${stylesRegister.input} mb-5`}>
          <NameInput
            placeholder="Имя"
            onChange={onChangeUserName}
            value={userName}
          />
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            isIcon={false}
          />
          <Password onChange={onChangePassword} value={password} />
        </div>
        <div className={`${stylesRegister.button} mb-20`}>
          <Button
            // onClick={handleNewUser}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <p
        className={` ${stylesRegister.text} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
}

export default RegisterList;
