import styleOrderCard from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export interface IOrderCard {
  orderNumber: number;
  name: string;
  price: number;
}

const OrderCard = () => {
  //const today = new Date();
  return (
    <div className={`${styleOrderCard.main} p-4 mb-4`}>
      <div className={`${styleOrderCard.header} mb-6`}>
        <p className="text text_type_digits-default">#034535</p>
        {/* <FormattedDate
          date={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              today.getHours(),
              today.getMinutes() - 1,
              0
            )
          }
        /> */}
      </div>
      <p className="text text_type_main-medium  mb-6">
        Death Star Starship Main бургер
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
