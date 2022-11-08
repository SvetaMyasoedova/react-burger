import React, { useState, useContext, useMemo } from "react";

import { ingredientsPropTypes } from "../../prop-types/ingredientPropTypes";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesCunstructor from "./burger-constructor.module.css";

//components
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";

import { IngredientsContext } from "../../services/appContext";

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const buns = useMemo(
    () => ingredients.filter((value) => value.type === "bun"),
    [ingredients]
  );

  const main = useMemo(
    () => ingredients.filter((value) => value.type !== "bun"),
    [ingredients]
  );

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <section
      className={`${stylesCunstructor.burgerConstructor} mt-2`}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {buns.length === 0 ? null : (
        <ConstructorElement
          key={buns[0]._id + "_ConstructorElementTop"}
          type="top"
          isLocked={true}
          text={`${buns[0].name} верх`}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />
      )}

      <div className={`${stylesCunstructor.scroll} mb-2`}>
        {main.map((ingredient) => (
          <ConstructorElement
            key={ingredient._id + "_ConstructorElement"}
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        ))}
      </div>
      {buns.length === 0 ? null : (
        <ConstructorElement
          key={ingredients[0]._id + "_ConstructorElementBottom"}
          type="bottom"
          isLocked={true}
          text={`${buns[0].name} низ`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      )}

      <div className={`${stylesCunstructor.order} mt-10 mb-20`}>
        <p className="mr-2 text text_type_digits-medium">610</p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {isModalVisible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = ingredientsPropTypes;

export default BurgerConstructor;
