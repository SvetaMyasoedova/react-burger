import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleOrderDetails from "./order-details.module.css";
import { getOrder } from "../../services/actions/burgerConstructor";

function OrderDetails() {
  const { createdOrder } = useSelector((state: any) => state.orderReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div className={`${styleOrderDetails.wrapper} pt-10 pr-25 pl-25 mb-8`}>
      <div
        className={`${styleOrderDetails.shadow} text text_type_digits-large`}
      >
        {createdOrder ? createdOrder.number : ""}
      </div>
      <div className="text text_type_main-medium mb-15">
        идентификатор заказа
      </div>
      <div className="mb-15">
        <CheckMarkIcon type="primary" />
      </div>

      <div className="mb-2 text text_type_main-small">
        Ваш заказ начали готовить
      </div>
      <div className="mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальнос станции
      </div>
    </div>
  );
}

export default OrderDetails;
