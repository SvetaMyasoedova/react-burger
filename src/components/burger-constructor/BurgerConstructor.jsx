import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";
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
  CLEAR_CONSTRUCTOR,
  CLEAR_ORDER,
} from "../../services/actions/burgerConstructor";
import stylesConstructor from "./burger-constructor.module.css";

//components
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import ConstructorElementWrapper from "./ConstructorElementWrapper";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = useSelector((state) => state.profileReducer);

  const { constructorBun } = useSelector((state) => state.constructorReducer);
  const { constructorIngredients } = useSelector(
    (state) => state.constructorReducer
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

      const newIngredient = { ...ingredient };
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

  const onDelete = (ingredient) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      uuid: ingredient.uuid,
      id: ingredient._id,
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
    return constructorIngredients.reduce(
      (acc, item) => acc + item.price,
      constructorBun ? constructorBun.price * 2 : 0
    );
  }, [constructorBun, constructorIngredients]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (order) => {

    if (!isLogin) {
      history.push('/login')
      
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    dispatch({
      type: CLEAR_CONSTRUCTOR,
    });
    dispatch({
      type: CLEAR_ORDER,
    });
  };

  const noBun = (
    <div className={stylesConstructor.boxBun}>
      <p
        className={` ${stylesConstructor.textInBox}  text text_type_main-small pt-7`}
      >
        Место для булки
      </p>
    </div>
  );


  return (
    <section className={`${stylesConstructor.burgerConstructor} mt-2`}>
      <div className="mb-2" ref={dropBunTop}>
        {constructorBun === null ? (
          noBun
        ) : (
          <div className="pr-5 pl-6">
            <ConstructorElement
              key={constructorBun._id + "_ConstructorElementTop"}
              type="top"
              isLocked={true}
              text={`${constructorBun.name} (верх)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          </div>
        )}
      </div>
      <div
        className={
          constructorIngredients.length === 0 ? "" : stylesConstructor.scroll
        }
        ref={dropMain}
      >
        {constructorIngredients.length === 0 ? (
          <div className={`${stylesConstructor.boxMain} mb-2`}>
            <p
              className={` ${stylesConstructor.textInBox}  text text_type_main-small pt-30`}
            >
              Место для соуса и начинки
            </p>
          </div>
        ) : (
          <div className={`${stylesConstructor.box}  mb-2`}>
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
          <div className="pr-5 pl-6">
            <ConstructorElement
              key={constructorBun._id + "_ConstructorElementTop"}
              type="bottom"
              isLocked={true}
              text={`${constructorBun.name} (низ)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          </div>
        )}
      </div>

      <div className={`${stylesConstructor.order} mt-10 mb-20`}>
        <p className="mr-2 text text_type_digits-medium">{totalPrice}</p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>

        <Button
          disabled={constructorBun === null}
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>

      {isModalVisible && (
        <Modal onClose={handleCloseModal} header={""}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = ingredientsPropTypes;

export default BurgerConstructor;
