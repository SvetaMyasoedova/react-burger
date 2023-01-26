import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { editUser } from "../../services/actions/editProfile";
import { NavLink, useHistory, useLocation } from "react-router-dom";
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
import { useForm } from "../../hooks/useForm";
import { LOGOUT_SUCCESS } from "../../services/action-types/profile-types";
import OrderCardContainer from "../order-card/order-card-container/OrderCardContainer";
import {
  WS_PROFILE_CLOSE_CONNECTION,
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CURRENT_ORDER,
} from "../../services/actions/wsProfileActionTypes";
import { TOrder } from "../../services/types/order";

const Profile: FC = () => {
  const { orders } = useSelector((state: any) => state.wsProfileReducer);
 
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleOpenModal = (order: TOrder) => {
    dispatch({
      payload: { currentOrder: order },
      type: WS_PROFILE_CURRENT_ORDER,
    });
  };

  const { name, email } = useSelector((state: any) => state.profileReducer);

  const { values, handleChange, setValues } = useForm({
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  useEffect(() => {
    setValues({ newName: name, newEmail: email, newPassword: "" });
  }, [name, email, setValues]);

  useEffect(() => {
    if (location.pathname === "/profile/orders") {
      dispatch({
        type: WS_PROFILE_CONNECTION_START,
        payload: `?token=${getCookie("token")}`
      });
    }

    if (location.pathname !== "/profile/orders") {
      dispatch({
        type: WS_PROFILE_CLOSE_CONNECTION,
      });
    }

  }, [location.pathname]);

  useEffect(() => {
    return () => {
      dispatch({
        type: WS_PROFILE_CLOSE_CONNECTION,
      });
    };
  }, []);

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
          dispatch({ type: LOGOUT_SUCCESS });
          localStorage.removeItem("refreshToken");
          deleteCookie("token");
          history.push("/login");
        }
      })
      .catch((err) => {});
  };

  return (
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
        {location.pathname === "/profile" && (
          <p
            className={` ${stylesProfile.text} text text_type_main-default text_color_inactive`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
      </div>
      {location.pathname === "/profile" && (
        <div className={stylesProfile.profile}>
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
      )}
      {location.pathname === "/profile/orders" && (
        <div className={stylesProfile.container}>
          <OrderCardContainer
            pathname={"profile/orders"}
            onClick={handleOpenModal}
            orders={orders}
            isProfileOrders={true}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
