import { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import stylesIngredients from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


// import { ingredientsPropTypes } from "../../prop-types/ingredientPropTypes";
import { TIngredient } from "../../services/types/data";

//components
import Tabs from "../tab-ingredients/Tabs";
import IngredientList from "../ingredients-list/IngredientList";
import { CURRENT_INGREDIENT } from "../../services/actions/burgerIngredients";

const BurgerIngredients: FC = () => {
  const { data } = useSelector((state: any) => state.dataReducer);

  const { ingredientsCount, constructorBun } = useSelector(
    (state: any) => state.constructorReducer
  );

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (ingredient: TIngredient) => {
    dispatch({
      currentIngredient: ingredient,
      type: CURRENT_INGREDIENT,
    });
    setIsModalVisible(true);
  };

  const { ref: refBuns, inView: inViewBuns } = useInView({
    threshold: 0,
  });
  const { ref: refSauce, inView: inViewSauce } = useInView({
    threshold: 0,
  });
  const { ref: refMain, inView: inViewMain } = useInView({
    threshold: 0,
  });

  if (data === undefined) {
    return null;
  }

  return (
    <section className={`${stylesIngredients.burgerIngredients} mr-10`}>
      <Tabs
        inViewBuns={inViewBuns}
        inViewSauce={inViewSauce}
        inViewMain={inViewMain}
      ></Tabs>

      <div className={stylesIngredients.scroll}>
        <h4 className="text text_type_main-medium mb-6">Булки</h4>

        <div ref={refBuns} className={`${stylesIngredients.buns} ml-4`}>
          {data
            .filter((bun: TIngredient) => bun.type === "bun")
            .map((bun: TIngredient) => {
              return (
                <IngredientList
                  type={bun.type}
                  id={bun._id}
                  onClick={handleOpenModal}
                  ingredient={bun}
                  count={
                    constructorBun && constructorBun._id === bun._id ? 2 : 0
                  }
                  key={bun._id + "_IngredientList"}
                  icon={<CurrencyIcon type="primary" />}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium mb-6">Соусы</h4>
        <div ref={refSauce} className={`${stylesIngredients.buns} mb-8 ml-4`}>
          {data
            .filter((sauce: TIngredient) => sauce.type === "sauce")
            .map((sauce: TIngredient) => {
              return (
                <IngredientList
                  type={sauce.type}
                  id={sauce._id}
                  onClick={handleOpenModal}
                  ingredient={sauce}
                  count={
                    ingredientsCount &&
                    ingredientsCount.hasOwnProperty(sauce._id)
                      ? ingredientsCount[sauce._id]
                      : 0
                  }
                  key={sauce._id + "_IngredientList"}
                  icon={<CurrencyIcon type="primary" />}
                />
              );
            })}
        </div>

        <h4 className="text text_type_main-medium pt-10 mt-15 mb-6">Начинки</h4>
        <div ref={refMain} className={`${stylesIngredients.buns} mb-8 ml-4`}>
          {data
            .filter((main: TIngredient) => main.type === "main")
            .map((main: TIngredient) => {
              return (
                <IngredientList
                  type={main.type}
                  id={main._id}
                  onClick={handleOpenModal}
                  ingredient={main}
                  count={
                    ingredientsCount &&
                    ingredientsCount.hasOwnProperty(main._id)
                      ? ingredientsCount[main._id]
                      : 0
                  }
                  key={main._id + "_IngredientList"}
                  icon={<CurrencyIcon type="primary" />}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

// BurgerIngredients.propTypes = ingredientsPropTypes;

export default BurgerIngredients;
