import React, { useState } from "react";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//components
import Tabs from "../tab-ingredients/Tabs";
import IngredientList from "../ingredients-list/IngredientList";
import Modal from "../modal/Modal";

function BurgerIngredients({ ingredients }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    // console.log("Modal is opened");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
   
  };

  return (
    <section className={`${stylesIngredients.burgerIngredients} mr-10`}>
      <Tabs></Tabs>
      <div className={stylesIngredients.scroll}>
        <h4 className="text text_type_main-medium mb-6">Булки</h4>

        <div className={`${stylesIngredients.buns} ml-4`}>
          {ingredients
            .filter((bun) => bun.type === "bun")
            .map((bun) => {
              return (
                <IngredientList
                  onClick={handleOpenModal}
                  key={bun._id + "_IngredientList"}
                  image={bun.image}
                  price={bun.price}
                  count={bun._id === "60666c42cc7b410027a1a9b1" ? 1 : 0}
                  icon={<CurrencyIcon type="primary" />}
                  name={bun.name}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium mb-6">Соусы</h4>
        <div className={`${stylesIngredients.buns} mb-8 ml-4`}>
          {ingredients
            .filter((sauce) => sauce.type === "sauce")
            .map((sauce) => {
              return (
                <IngredientList
                onClick={handleOpenModal}
                  key={sauce._id + "_IngredientList"}
                  image={sauce.image}
                  price={sauce.price}
                  count={sauce._id === "60666c42cc7b410027a1a9b8" ? 1 : 0}
                  icon={<CurrencyIcon type="primary" />}
                  name={sauce.name}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium pt-10 mt-15 mb-6">Начинки</h4>
        <div className={`${stylesIngredients.buns} mb-8 ml-4`}>
          {ingredients
            .filter((main) => main.type === "main")
            .map((main) => {
              return (
                <IngredientList
                onClick={handleOpenModal}
                  key={main._id + "_IngredientList"}
                  image={main.image}
                  price={main.price}
                  icon={<CurrencyIcon type="primary" />}
                  name={main.name}
                />
              );
            })}
        </div>
      </div>

      {isModalVisible && <Modal header={'Детали ингредиента'} onClose={handleCloseModal}></Modal>}
    </section>
  );
}

export default BurgerIngredients;
