import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../services/actions/editProfile";

import { NavLink, useHistory } from "react-router-dom";
import stylesProfile from "./profile.module.css";

import { NameInput } from "../register-list/name-input/NameInput";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Password } from "../register-list/password-input/Password";
import { fetchWithRefresh } from "../../utils/refreshToken";
import { LOGOUT_URL } from "../../utils/urls";
import { getCookie, deleteCookie } from "../../utils/cookie";

import { ActionLogoutType } from "../../services/actions/profile";
import { useForm } from "../../hooks/useForm";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email } = useSelector((state: any) => state.profileReducer);

  const { values, handleChange, setValues } = useForm({
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  useEffect(() => {
    setValues({ newName: name, newEmail: email });
  }, [name, email, setValues]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editUser(values.newName, values.newEmail));
  };
  const handleCancel = () => {
    setValues({ newName: name, newEmail: email });
  };

  const handleLogOut = () => {
    fetchWithRefresh(LOGOUT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("token"),
      },

      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: ActionLogoutType.LOGOUT_SUCCESS });
          localStorage.removeItem("refreshToken");
          deleteCookie("token");
          history.push("/login");
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className={`${stylesProfile.main} mt-30`}>
        <div className={`${stylesProfile.nav} text text_type_main-medium `}>
          <NavLink
            exact
            to="/profile"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
          >
            Профиль
          </NavLink>
          <NavLink
            exact
            to="/profile/orders"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
          >
            История заказов
          </NavLink>
          <NavLink
            exact
            to="/login"
            activeClassName={stylesProfile.activeLink}
            className="text_color_inactive"
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </div>

        <form className={stylesProfile.input} onSubmit={handleSave}>
          <NameInput
            value={values.newName}
            onChange={handleChange}
            placeholder="Имя"
            icon="EditIcon"
            name={"newName"}
          />
          <EmailInput
            onChange={handleChange}
            value={values.newEmail}
            name={"newEmail"}
            isIcon={true}
          />
          <Password
            value={values.newPassword}
            onChange={handleChange}
            icon="EditIcon"
            name={"newPassword"}
          />
          {name === values.newName && email === values.newEmail ? null : (
            <div className={stylesProfile.buttons}>
              <Button
                onClick={handleCancel}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
      <p
        className={` ${stylesProfile.text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </>
  );
};

export default Profile;
