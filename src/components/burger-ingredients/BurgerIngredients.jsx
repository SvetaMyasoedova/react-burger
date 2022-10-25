import React from "react";
import stylesIngredients from "./burger-ingredients.module.css"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Bun2 from "../../images/bun-02.png";
import Bun1 from "../../images/bun-01.png";

import Tabs from "../tab-ingredients/Tabs";
import IngredientBuns from "../ingredients-list/IngredientBuns";

function BurgerIngredients() {
  return (
    <>
      <Tabs></Tabs>

      <h4 className='text text_type_main-medium mb-6' >Булки</h4>
	
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
    </>
  );
}

export default BurgerIngredients;
