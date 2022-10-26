import React from "react";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

//components
import Tabs from "../tab-ingredients/Tabs";
import IngredientBuns from "../ingredients-list/IngredientBuns";

function BurgerIngredients() {
  return (
    <>
      <Tabs></Tabs>
      <div className={stylesIngredients.scroll}>
        <h4 className="text text_type_main-medium mb-6">Булки</h4>

        <div className={stylesIngredients.buns}>
          {data
            .filter((bun) => bun.type === "bun")
            .map((bun) => {
              return (
                <IngredientBuns
                  key={bun._id}
                  image={bun.image}
                  price={bun.price}
                  count={1}
                  icon={<CurrencyIcon type="primary" />}
                  name={bun.name}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium mb-6">Соусы</h4>
        <div className={`${stylesIngredients.buns} mb-8`}>
          {data
            .filter((sauce) => sauce.type === "sauce")
            .map((sauce) => {
              return (
                <IngredientBuns
                  key={sauce._id}
                  image={sauce.image}
                  price={sauce.price}
                  count={1}
                  icon={<CurrencyIcon type="primary" />}
                  name={sauce.name}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
