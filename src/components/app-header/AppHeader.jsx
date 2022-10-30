import React from "react";
import stylesHeader from "./app-header.module.css";
import ElementHeader from "../element-header/ElementHeader";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <div className={`${stylesHeader.wrapper} mb-10`}>
      <header
        className={`${stylesHeader.header} p-5 text text_type_main-default `}
      >
        <div className={stylesHeader.leftSideElements}>
          <a href="#" className={stylesHeader.white}>
            <ElementHeader
              icon={<BurgerIcon type="primary" />}
              text={"Конструктор"}
            />
          </a>

          <a href="#" className={stylesHeader.darkGrayText}>
            <ElementHeader
              icon={<ListIcon type="secondary" />}
              text={"Лента заказов"}
            />
          </a>
        </div>

        <div className={stylesHeader.logo}>
          <Logo />
        </div>
        <a href="#" className={stylesHeader.darkGrayText}>
          <ElementHeader
            icon={<ProfileIcon type="secondary" />}
            text={"Личный кабинет"}
          />
        </a>
      </header>
    </div>
  );
}

export default AppHeader;
