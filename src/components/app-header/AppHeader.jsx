import { Link } from "react-router-dom";
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
          <Link to="#" className={stylesHeader.white}>
            <ElementHeader
              icon={<BurgerIcon type="primary" />}
              text={"Конструктор"}
            />
          </Link>

          <Link to="#" className="text_color_inactive">
            <ElementHeader
              icon={<ListIcon type="secondary" />}
              text={"Лента заказов"}
            />
          </Link>
        </div>

        <div className={stylesHeader.logo}>
          <Logo />
        </div>
        <Link to="/profile" className="text_color_inactive">
          <ElementHeader
            icon={<ProfileIcon type="secondary" />}
            text={"Личный кабинет"}
          />
        </Link>
      </header>
    </div>
  );
}

export default AppHeader;
