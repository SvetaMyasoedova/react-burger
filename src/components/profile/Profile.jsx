import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../services/actions/profile";
import { editUser } from "../../services/actions/editProfile";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { name } = useSelector((state) => state.profileReducer);
  const { email } = useSelector((state) => state.profileReducer);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setNewName(name);
    setNewEmail(email);
  }, [name, email]);

  const onChangeUserName = (e) => {
    setNewName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = () => {
    console.log("handleSave");
    dispatch(editUser(newName, newEmail));
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
            value={newName}
            onChange={onChangeUserName}
            placeholder="Имя"
            icon="EditIcon"
          />
          <EmailInput
            onChange={onChangeEmail}
            value={newEmail}
            name={"email"}
            isIcon={true}
          />
          <Password
            value={newPassword}
            onChange={onChangePassword}
            icon="EditIcon"
          />

          <div className={stylesProfile.buttons}>
            <a className="text text_type_main-default" href="#">
              Отмена
            </a>
            <Button
              onClick={handleSave}
              htmlType="button"
              type="primary"
              size="medium"
            >
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
