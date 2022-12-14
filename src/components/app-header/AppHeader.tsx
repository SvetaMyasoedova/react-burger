import { Link, useRouteMatch } from "react-router-dom";
import stylesHeader from "./app-header.module.css";
import ElementHeader from "../element-header/ElementHeader";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true });
  const isFeed = !!useRouteMatch("/feed");
  const isProfile = !!useRouteMatch("/profile");
  return (
    <div className={`${stylesHeader.wrapper} mb-10`}>
      <header
        className={`${stylesHeader.header} p-5 text text_type_main-default `}
      >
        <div className={stylesHeader.leftSideElements}>
          <Link
            to="/"
            className={
              isConstructor ? stylesHeader.white : "text_color_inactive"
            }
          >
            <ElementHeader
              icon={
                isConstructor ? (
                  <BurgerIcon type="primary" />
                ) : (
                  <BurgerIcon type="secondary" />
                )
              }
              text={"Конструктор"}
            />
          </Link>

          <Link
            to="#"
            className={isFeed ? stylesHeader.white : "text_color_inactive"}
          >
            <ElementHeader
              icon={
                isFeed ? (
                  <ListIcon type="primary" />
                ) : (
                  <ListIcon type="secondary" />
                )
              }
              text={"Лента заказов"}
            />
          </Link>
        </div>

        <div className={stylesHeader.logo}>
          <Logo />
        </div>
        <Link
          to="/profile"
          className={isProfile ? stylesHeader.white : "text_color_inactive"}
        >
          <ElementHeader
            icon={
              isProfile ? (
                <ProfileIcon type="primary" />
              ) : (
                <ProfileIcon type="secondary" />
              )
            }
            text={"Личный кабинет"}
          />
        </Link>
      </header>
    </div>
  );
}

export default AppHeader;
