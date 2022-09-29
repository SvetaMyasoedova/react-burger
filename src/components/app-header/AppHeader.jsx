import React from "react";
import stylesHeader from "./app-header.module.css";
import ElementHeader from "../element-header/ElementHeader";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <div className={stylesHeader.wrapper}>
      <header
        className={`${stylesHeader.header} p-5 text text_type_main-default `}
      >
        <ElementHeader
          className={stylesHeader.item}
          icon={<BurgerIcon type="primary" />}
          text={"Конструктор"}
        />
        <ElementHeader
          icon={<ListIcon type="secondary" />}
          text={"Лента заказов"}
        />

        <Logo />
        <ElementHeader
          icon={<ProfileIcon type="secondary" />}
          text={"Личный кабинет"}
        />
      </header>
    </div>
  );
}

export default AppHeader;
