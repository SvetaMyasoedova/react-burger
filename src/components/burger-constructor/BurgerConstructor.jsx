import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useDrop, useDrag } from "react-dnd";
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
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORTABLE_INGREDIENT,
} from "../../services/actions/constants";
import stylesCunstructor from "./burger-constructor.module.css";

//components
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import ConstructorElementWrapper from "./ConstructorElementWrapper";

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
      if (ingredient.hasOwnProperty("uuid")) {
        return;
      }

      let newIngredient = JSON.parse(JSON.stringify(ingredient));
      newIngredient.uuid = uuidv4();
      dispatch({
        type: CONSTRUCTOR_MAIN,
        constructorIngredient: newIngredient,
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

  const onDelete = (uuid) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      uuid: uuid,
    });
  };

  const sortIngredients = (dragIndex, hoverIndex) => {
    dispatch({
      type: SORTABLE_INGREDIENT,
      hoverIndex: hoverIndex,
      dragIndex: dragIndex,
    });
  };

  const totalPrice = useMemo(() => {
    if (constructorBun || constructorIngredients.length !== 0) {
      if (constructorBun && constructorIngredients.length === 0) {
        return constructorBun.price * 2;
      } else if (!constructorBun && constructorIngredients.length !== 0) {
        return constructorIngredients
          .map((item) => item.price)
          .reduce((acc, item) => acc + item, 0);
      } else if (constructorBun && constructorIngredients.length !== 0) {
        let priseOfBuns = constructorBun.price * 2;
        let priceOfIngredients = constructorIngredients
          .map((item) => item.price)
          .reduce((acc, item) => acc + item, 0);
        return priseOfBuns + priceOfIngredients;
      }
    } else return 0;
  }, [constructorBun, constructorIngredients]);

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
            {constructorIngredients.map((ingredient, index) => (
              <ConstructorElementWrapper
                key={ingredient.uuid}
                ingredient={ingredient}
                index={index}
                onDelete={onDelete}
                sortIngredients={sortIngredients}
              />
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
        <p className="mr-2 text text_type_digits-medium">{totalPrice}</p>
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
