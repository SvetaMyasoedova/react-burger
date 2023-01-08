import styleOrderCard from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export interface IOrderCard {
  number: number;
  name: string;
  price: number;
}

const OrderCard = (order: any) => {
  const { data } = useSelector((state: any) => state.dataReducer);
  const filteredArray = data.filter((value: any) =>
    order.order.ingredients.includes(value._id)
  );
  return (
    <div className={`${styleOrderCard.main} p-4 mb-4 mr-2`}>
      <div className={`${styleOrderCard.header} mb-6`}>
        <p className="text text_type_digits-default">#{order.order.number}</p>
      </div>
      <p className="text text_type_main-medium  mb-6">{order.order.name}</p>
      <div className={styleOrderCard.bottom}>
        <div className={styleOrderCard.ingredientsWrapper}>
          {filteredArray.slice(0, 6).map((ingredient: any, index: number) => {
            if (index === 5) {
              return (
                <div className={styleOrderCard.imgWrapper}>
                  <img
                    className={styleOrderCard.ingredientImgLast}
                    src={ingredient.image}
                    alt={ingredient.name}
                  />
                  <p className="text text_type_digits-default">
                    +{filteredArray.length - 6}
                  </p>
                </div>
              );
            }
            return (
              <div className={styleOrderCard.imgWrapper}>
                <img
                  className={styleOrderCard.ingredientImg}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
              </div>
            );
          })}
        </div>
        <div className={styleOrderCard.price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
