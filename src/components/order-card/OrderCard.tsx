import styleOrderCard from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { TLocationState } from "../../services/types/location";
import { TOrder } from "../../services/types/order";
import { TIngredient } from "../../services/types/data";

export const statusInfo = (status: string) => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    default:
      return status;
  }
};

export interface IOrderCard {
  order: TOrder;
  pathname: string;
  onClick: (order: TOrder) => void;
  isProfileOrders?: boolean;
}

const OrderCard = ({
  order,
  pathname,
  onClick,
  isProfileOrders,
}: IOrderCard) => {
  const { data } = useSelector((state: any) => state.dataReducer);

  const filteredArray = data.filter((value: TIngredient) =>
    order.ingredients.includes(value._id)
  );
  const location = useLocation<TLocationState>();

  return (
    <Link<TLocationState>
      to={{
        pathname: `/${pathname}/${order._id}`,
        state: { background: location },
      }}
      className={styleOrderCard.link}
    >
      <div
        onClick={() => {
          onClick(order);
        }}
        className={`${styleOrderCard.main} p-4 mb-4 mr-2`}
      >
        <div className={`${styleOrderCard.header} mb-6`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <div className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </div>
        </div>
        <p className="text text_type_main-medium mb-2">{order.name}</p>
        {isProfileOrders && (
          <p
            className={
              order.status === "done"
                ? `${styleOrderCard.done} text text_type_main-small mb-6`
                : "text text_type_main-small mb-6"
            }
          >
            {statusInfo(order.status)}
          </p>
        )}

        <div className={styleOrderCard.bottom}>
          <div className={styleOrderCard.ingredientsWrapper}>
            {filteredArray
              .slice(0, 6)
              .map((ingredient: TIngredient, index: number) => {
                if (filteredArray.length > 6 && index === 5) {
                  return (
                    <div
                      key={ingredient._id}
                      className={styleOrderCard.wrapper}
                    >
                      <div className={styleOrderCard.imgWrapper}>
                        <img
                          className={styleOrderCard.ingredientImgLast}
                          src={ingredient.image}
                          alt={ingredient.name}
                        />
                        <p
                          className={`${styleOrderCard.lastLabel} text text_type_digits-default`}
                        >
                          +{filteredArray.length - 6}
                        </p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={ingredient._id} className={styleOrderCard.wrapper}>
                    <div className={styleOrderCard.imgWrapper}>
                      <img
                        className={styleOrderCard.ingredientImg}
                        src={ingredient.image}
                        alt={ingredient.name}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styleOrderCard.price}>
            <p className="text text_type_digits-default">
              {filteredArray.reduce(
                (
                  acc: number,
                  ingredient: TIngredient,
                  currentIndex: number
                ) => {
                  let sum: number = 0;
                  if (currentIndex === 0) {
                    sum = acc + ingredient.price * 2;
                  } else {
                    sum = acc + ingredient.price;
                  }
                  return sum;
                },
                0
              )}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
