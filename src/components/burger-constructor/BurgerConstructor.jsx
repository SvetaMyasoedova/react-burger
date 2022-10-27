import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesCunstructor from "./burger-constructor.module.css";
import { data } from "../../utils/data";

function BurgerConstructor() {
  return (
    <section
      className={`${stylesCunstructor.burgerConstructor} mt-2`}
      style={{ display: "flex", flexDirection: "column", gap: "10px"}}
    >
      <ConstructorElement
        key={data[0]._id}
        type="top"
        isLocked={true}
        text={data[0].name}
        price={data[0].price}
        thumbnail={data[0].image}
      />
      <div className={`${stylesCunstructor.scroll} mb-2`}>
        {data.map((ingredient) => (
          <ConstructorElement
            key={ingredient._id}
            type="top"
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        ))}
      </div>

      <ConstructorElement
        key={data[data.length - 1]._id}
        type="top"
        isLocked={true}
        text={data[data.length - 1].name}
        price={data[data.length - 1].price}
        thumbnail={data[data.length - 1].image}
      />

      <div className={`${stylesCunstructor.order} mt-10 mb-20`}>
        <p className="mr-2 text text_type_digits-medium">610</p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
