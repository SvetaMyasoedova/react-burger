import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CURRENT_INGREDIENT } from "../../services/actions/constants";

import { ingredientsPropTypes } from "../../prop-types/ingredientPropTypes";
import { getIngredients } from "../../services/reducers";

//components
import Tabs from "../tab-ingredients/Tabs";
import IngredientList from "../ingredients-list/IngredientList";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

function BurgerIngredients() {
  const { data } = useSelector((state) => state.dataReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  

  const handleOpenModal = (ingredient) => {
    console.log(ingredient)
    dispatch({ currentIngredient: ingredient, type: CURRENT_INGREDIENT });
    setIsModalVisible(true);
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
          {data
            .filter((bun) => bun.type === "bun")
            .map((bun) => {
              return (
                <IngredientList
                  id={bun._id}
                  onClick={handleOpenModal}
                  ingredient={bun}
                  key={bun._id + "_IngredientList"}
                  count={bun._id === "60666c42cc7b410027a1a9b1" ? 1 : 0}
                  icon={<CurrencyIcon type="primary" />}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium mb-6">Соусы</h4>
        <div className={`${stylesIngredients.buns} mb-8 ml-4`}>
          {data
            .filter((sauce) => sauce.type === "sauce")
            .map((sauce) => {
              return (
                <IngredientList
                  id={sauce._id}
                  onClick={handleOpenModal}
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
          {data
            .filter((main) => main.type === "main")
            .map((main) => {
              return (
                <IngredientList
                  id={main._id}
                  onClick={handleOpenModal}
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
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = ingredientsPropTypes;

export default BurgerIngredients;
