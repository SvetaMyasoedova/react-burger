import React from "react";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//images
import Bun2 from "../../images/bun-02.png";
import Bun1 from "../../images/bun-01.png";
import Sauce2 from "../../images/sauce-02.png";
import Sauce4 from "../../images/sauce-04.png";
import Sauce3 from "../../images/sauce-03.png";
import Sauce1 from "../../images/sauce-01.png";

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
          <IngredientBuns
            image={Bun2}
            price={20}
            count={1}
            icon={<CurrencyIcon type="primary" />}
            name={"Краторная булка N-200i"}
          />
          <IngredientBuns
            image={Bun1}
            price={20}
            icon={<CurrencyIcon type="primary" />}
            name={"Флюоресцентная булка R2-D3"}
          />
        </div>
        <h4 className="text text_type_main-medium mb-6">Соусы</h4>
        <div className={`${stylesIngredients.buns} mb-8`}>
          <IngredientBuns
            image={Sauce2}
            price={30}
            icon={<CurrencyIcon type="primary" />}
            name={"Соус Spicy-X"}
          />
          <IngredientBuns
            image={Sauce4}
            price={30}
            icon={<CurrencyIcon type="primary" />}
            name={"Соус фирменный Space Sauce"}
          />
        </div>
        <div className={stylesIngredients.buns}>
          <IngredientBuns image={Sauce3} count={1} />
          <IngredientBuns image={Sauce1} />
        </div>

        
      </div>
    </>
  );
}

export default BurgerIngredients;
