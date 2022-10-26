import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesCunstructor from "./burger-constructor.module.css";
import { data } from "../../utils/data";

function BurgerConstructor() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {data.map((ingredient) => (
        <ConstructorElement
          key={ingredient._id}
          type="top"
          isLocked={true}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      ))}

      <div className={stylesCunstructor.order}>
        <p className="mr-2 text text_type_digits-medium">610</p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
