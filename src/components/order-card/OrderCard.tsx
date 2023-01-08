import styleOrderCard from "./order-card.module.css";
import { CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export interface IOrderCard {
  number: number;
  name: string;
  price: number;
}

const OrderCard = (order: any) => {
  return (
    <div className={`${styleOrderCard.main} p-4 mb-4 mr-2`}>
      <div className={`${styleOrderCard.header} mb-6`}>
        <p className="text text_type_digits-default">{order.order.number}</p>
        
      </div>
      <p className="text text_type_main-medium  mb-6">
        {order.order.name}
      </p>
      <div className={styleOrderCard.bottom}>
        <div>картинка</div>
        <div className={styleOrderCard.price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
