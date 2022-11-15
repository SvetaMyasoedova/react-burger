import React, { useState, useMemo, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { ingredientsPropTypes } from "../../prop-types/ingredientPropTypes";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN,
} from "../../services/actions/constants";
import stylesCunstructor from "./burger-constructor.module.css";

//components
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { constructorBun } = useSelector(
    (state) => state.cunstructorBunReducer
  );
  const { constructorIngredients } = useSelector(
    (state) => state.cunstructorMainReducer
  );

  const [, dropBunTop] = useDrop({
    accept: "bun",
    drop(ingredient) {
      dispatch({
        type: CONSTRUCTOR_BUN,
        constructorBun: ingredient,
      });
    },
  });

  const [, dropMain] = useDrop({
    accept: ["sauce", "main"],
    drop(ingredient) {
      dispatch({
        type: CONSTRUCTOR_MAIN,
        constructorIngredients: ingredient,
      });
    },
  });

  const [, dropBunBottom] = useDrop({
    accept: "bun",
    drop(ingredient) {
      dispatch({
        type: CONSTRUCTOR_BUN,
        constructorBun: ingredient,
      });
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (order) => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const noBun = (
    <div className={stylesCunstructor.boxBun}>
      <p
        className={` ${stylesCunstructor.textInBox}  text text_type_main-small mt-5`}
      >
        Место для булки
      </p>
    </div>
  );

  return (
    <section
      className={`${stylesCunstructor.burgerConstructor} mt-2`}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div ref={dropBunTop}>
        {constructorBun === null ? (
          noBun
        ) : (
          <ConstructorElement
            key={constructorBun._id + "_ConstructorElementTop"}
            type="top"
            isLocked={true}
            text={`${constructorBun.name} верх`}
            price={constructorBun.price}
            thumbnail={constructorBun.image}
          />
        )}
      </div>
      <div
        className={
          constructorIngredients.length === 0 ? "" : stylesCunstructor.scroll
        }
        ref={dropMain}
      >
        {constructorIngredients.length === 0 ? (
          <div className={stylesCunstructor.boxMain}>
            <p
              className={` ${stylesCunstructor.textInBox}  text text_type_main-small mt-5`}
            >
              Место для соуса и начинки
            </p>
          </div>
        ) : (
          <div className={`${stylesCunstructor.box}  mb-2`}>
            
            {constructorIngredients.map((ingredient) => (
              <div className="mb-2 mr-2"> 
                <ConstructorElement
                key={ingredient._id + "_ConstructorElement"}
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
              </div>
             
            ))}
          </div>
        )}
      </div>
      <div ref={dropBunBottom}>
        {constructorBun === null ? (
          noBun
        ) : (
          <ConstructorElement
            key={constructorBun._id + "_ConstructorElementTop"}
            type="top"
            isLocked={true}
            text={`${constructorBun.name} низ`}
            price={constructorBun.price}
            thumbnail={constructorBun.image}
          />
        )}
      </div>

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
