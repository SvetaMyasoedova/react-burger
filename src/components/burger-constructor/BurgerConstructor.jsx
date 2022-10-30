import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesCunstructor from "./burger-constructor.module.css";
import { ingredients } from "../../utils/ingredients";

function BurgerConstructor() {
  return (
    <section
      className={`${stylesCunstructor.burgerConstructor} mt-2`}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <ConstructorElement
        key={ingredients[0]._id}
        type="top"
        isLocked={true}
        text={ingredients[0].name}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />
      <div className={`${stylesCunstructor.scroll} mb-2`}>
        {ingredients.map((ingredient) => (
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
        key={ingredients[ingredients.length - 1]._id}
        type="top"
        isLocked={true}
        text={ingredients[ingredients.length - 1].name}
        price={ingredients[ingredients.length - 1].price}
        thumbnail={ingredients[ingredients.length - 1].image}
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
