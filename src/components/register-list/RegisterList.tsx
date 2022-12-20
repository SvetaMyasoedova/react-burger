import { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesRegister from "./register-list.module.css";
import getRegister from "../../services/actions/register";
import { getUser } from "../../services/actions/profile";

import { Link, Redirect, useLocation } from "react-router-dom";

import { NameInput } from "./name-input/NameInput";
import { Password } from "./password-input/Password";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TLocationState } from "../../services/types/location";
import { useForm } from "../../hooks/useForm";

const RegisterList: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const { isLogin } = useSelector((state: any) => state.profileReducer);

  const { values, handleChange, setValues } = useForm({
    userName: "",
    email: "",
    password: "",
  });

  const handleNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getRegister(values.email, values.password, values.userName));
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLogin) {
    return <Redirect to={location?.state?.from || "/"} />;
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
            onChange={handleChange}
            value={values.userName}
            name={"userName"}
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
          />
          <Password
            onChange={handleChange}
            value={values.password}
            name={"password"}
          />
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
};

export default RegisterList;
