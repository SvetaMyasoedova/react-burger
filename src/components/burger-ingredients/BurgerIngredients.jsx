import React, { useState } from "react";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//components
import Tabs from "../tab-ingredients/Tabs";
import IngredientList from "../ingredients-list/IngredientList";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

function BurgerIngredients({ ingredients }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSelectedElem, setCurrentSelectedElem] = useState({
    image: "",
    name: "",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  });

  const handleOpenModal = (ingredient ) => {
    setCurrentSelectedElem({
      image: ingredient.image,
      name: ingredient.name,
      calories: ingredient.calories,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
    })
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
                  id={bun._id}
                  onClick={handleOpenModal}
                  ingredient={bun}
                  setCurrentSelectedElem={setCurrentSelectedElem}
                  key={bun._id + "_IngredientList"}
                  count={bun._id === "60666c42cc7b410027a1a9b1" ? 1 : 0}
                  icon={<CurrencyIcon type="primary" />}
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
                  id={sauce._id}
                  onClick={handleOpenModal}
                  setCurrentSelectedElem={setCurrentSelectedElem}
                  ingredient={sauce}
                  key={sauce._id + "_IngredientList"}
                  count={sauce._id === "60666c42cc7b410027a1a9b8" ? 1 : 0}
                  icon={<CurrencyIcon type="primary" />}
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
                  id={main._id}
                  onClick={handleOpenModal}
                  setCurrentSelectedElem={setCurrentSelectedElem}
                  ingredient={main}
                  key={main._id + "_IngredientList"}
                  icon={<CurrencyIcon type="primary" />}
                />
              );
            })}
        </div>
      </div>

      {isModalVisible && (
        <Modal header={"Детали ингредиента"} onClose={handleCloseModal}>
          <IngredientDetails currentSelectedElem = {currentSelectedElem}/>
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
