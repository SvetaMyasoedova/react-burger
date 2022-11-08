import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleOrderDetails from "./order-details.module.css";
import { orderUrl } from "../../utils/urls";

function OrderDetails() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      
      try {
        const res = await fetch(orderUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: [
              "60d3b41abdacab0026a733c6",
              "60d3b41abdacab0026a733c7",
            ],
          }),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setOrder(data.order.number);
      } catch (err) {
        console.error("getOrderData failed");
      }
    };

    getOrderData();
  }, []);

  return (
    <div className={`${styleOrderDetails.wrapper} pt-10 pr-25 pl-25 mb-8`}>
      <div
        className={`${styleOrderDetails.shadow} text text_type_digits-large`}
      >
        {order}
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

// OrderDetails.propTypes = {
//   orderId: PropTypes.string.isRequired,
// };

export default OrderDetails;
