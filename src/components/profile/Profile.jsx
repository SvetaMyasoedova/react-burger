import { useState } from "react";

import { NavLink } from "react-router-dom";
import stylesProfile from "./profile.module.css";

import AppHeader from "../app-header/AppHeader";
import { NameInput } from "../register-list/name-input/NameInput";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from "../register-list/password-input/Password";
import { fetchWithRefresh } from "../../utils/refreshToken";
import { LOGOUT_URL } from "../../utils/urls";
import { getCookie } from "../../utils/cookie";

function Profile() {
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

  const handleLogOut = () => {
    fetchWithRefresh(LOGOUT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("token"),
      },

      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then((res) => {
        if (res && res.success) {
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="mb-30">
        <AppHeader />
      </div>
      <div className={stylesProfile.main}>
        <div className={`${stylesProfile.nav} text text_type_main-medium `}>
          <NavLink
            to="/profile"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
          >
            История заказов
          </NavLink>
          <NavLink
            to="/profile/orders/:id"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </div>
        <div className={stylesProfile.input}>
          <NameInput
            value={userName}
            onChange={onChangeUserName}
            placeholder="Имя"
            icon="EditIcon"
          />
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            isIcon={true}
          />
          <Password
            value={password}
            onChange={onChangePassword}
            icon="EditIcon"
          />

          <div  className={stylesProfile.buttons}>
            <a className="text text_type_main-default" href="#">Отмена</a>
            <Button htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
      <p
        className={` ${stylesProfile.text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </>
  );
}

export default Profile;
