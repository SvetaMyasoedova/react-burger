import styleOrderCard from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { TLocationState } from "../../services/types/location";

export interface IOrderCard {
  order: any;
  pathname: string;
  onClick: (order: any) =>  void;
}

const OrderCard = ({order,pathname, onClick}: IOrderCard) => {
  const { data } = useSelector((state: any) => state.dataReducer);

  const filteredArray = data.filter((value: any) =>
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
          onClick(order.order);
        }}
        className={`${styleOrderCard.main} p-4 mb-4 mr-2`}
      >
        <div className={`${styleOrderCard.header} mb-6`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <div className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </div>
        </div>
        <p className="text text_type_main-medium  mb-6">{order.name}</p>
        <div className={styleOrderCard.bottom}>
          <div className={styleOrderCard.ingredientsWrapper}>
            {filteredArray.slice(0, 6).map((ingredient: any, index: number) => {
              if (index === 5) {
                return (
                  <div key={ingredient._id} className={styleOrderCard.wrapper}>
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
                (acc: number, ingredient: any, currentIndex: number) => {
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
