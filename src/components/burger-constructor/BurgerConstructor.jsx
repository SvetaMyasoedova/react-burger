import React, { useState } from "react";

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

function BurgerConstructor({ ingredients }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    // console.log("Modal is opened");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  if (ingredients.length === 0) {
    return <></>;
  }

  return (
    <section
      className={`${stylesCunstructor.burgerConstructor} mt-2`}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <ConstructorElement
        key={ingredients[0]._id + "_ConstructorElementTop"}
        type="top"
        isLocked={true}
        text={ingredients[0].name}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />
      <div className={`${stylesCunstructor.scroll} mb-2`}>
        {ingredients.map((ingredient) => (
          <ConstructorElement
            key={ingredient._id + "_ConstructorElement"}
            type="top"
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        ))}
      </div>

      <ConstructorElement
        key={ingredients[0]._id + "_ConstructorElementBottom"}
        type="bottom"
        isLocked={true}
        text={ingredients[0].name}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />

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
          <OrderDetails orderId={"034536"} />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = ingredientsPropTypes;

export default BurgerConstructor;
