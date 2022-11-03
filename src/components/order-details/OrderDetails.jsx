import PropTypes from "prop-types";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleOrderDetails from "./order-details.module.css";

function OrderDetails({ orderId }) {
  return (
    <div className={`${styleOrderDetails.wrapper} pt-10 pr-25 pl-25 mb-8`}>
      <div className={`${styleOrderDetails.shadow} text text_type_digits-large`}>{orderId}</div>
      <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
		<div className='mb-15'>
			<CheckMarkIcon type="primary" />
		</div>
      
      <div className='mb-2 text text_type_main-small'>Ваш заказ начали готовить</div>
      <div className='mb-30 text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальнос станции</div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.string,
  
};

export default OrderDetails;
