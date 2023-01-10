import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { useLocation, useParams } from "react-router-dom";
import { WS_CURRENT_ORDER } from "../../services/actions/wsActionTypes";
import { WS_PROFILE_CURRENT_ORDER } from "../../services/actions/wsProfileActionTypes";
import { TLocationState } from "../../services/types/location";
import IngredientDetails from "./ingredientDetails";
import styleOrderCardDetails from "./order-card-details.module.css";
import { TOrder } from "../../services/types/order";
import { TIngredient } from "../../services/types/data";

interface IOrderDetailsParams {
  orderId: string;
}

const OrderCardDetails = () => {
  const location = useLocation<TLocationState>();
  const { orders } = useSelector((state: any) => {
    if (location.pathname.includes("/profile/orders")) {
      return state.wsProfileReducer;
    } else {
      return state.wsReducer;
    }
  });
  const { orderId } = useParams<IOrderDetailsParams>();
  const { data } = useSelector((state: any) => state.dataReducer);
  const currentOrder = useSelector((state: any) => {
    if (location.pathname.includes("/profile/orders")) {
      return state.wsProfileReducer.currentOrder;
    } else {
      return state.wsReducer.currentOrder;
    }
  });

  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [filteredArray, setFilteredArray] = useState<TIngredient[]>([]);

  useEffect(() => {
    if (orders.length !== 0 && !background) {
      dispatch({
        payload: {
          currentOrder: orders.find((item: TOrder) => item._id === orderId),
        },
        type: location.pathname.includes("/profile/orders")
          ? WS_PROFILE_CURRENT_ORDER
          : WS_CURRENT_ORDER,
      });
    }

    if (background && (currentOrder === null || currentOrder === undefined)) {
      dispatch({
        payload: {
          currentOrder: orders.find((item: TOrder) => item._id === orderId),
        },
        type: location.pathname.includes("/profile/orders")
          ? WS_PROFILE_CURRENT_ORDER
          : WS_CURRENT_ORDER,
      });
    }
  }, [orders]);

  useEffect(() => {
    if (currentOrder === null || currentOrder === undefined) {
      return;
    }

    const tCounts: { [key: string]: number } = {};
    currentOrder.ingredients.forEach((id: string, index: number) => {
      tCounts[id] = (tCounts[id] || 0) + 1;
    });

    const tUniqueIngredients = currentOrder.ingredients.filter(
      (v: string, i: number, a: string[]) => a.indexOf(v) === i
    );

    const tFilteredArray = data.filter((value: TIngredient) =>
      tUniqueIngredients.includes(value._id)
    );

    setCounts(tCounts);
    setFilteredArray(tFilteredArray);
  }, [currentOrder]);

  if (currentOrder === null || currentOrder === undefined) {
    return null;
  }

  return (
    <div className={`${styleOrderCardDetails.main} p-6`}>
      <p
        className={`${styleOrderCardDetails.number} text text_type_digits-default mb-6`}
      >
        #{currentOrder.number}
      </p>
      <p className="text text_type_main-medium mb-3">{currentOrder.name}</p>
      <p
        className={` ${styleOrderCardDetails.status} text text_type_main-default mb-15`}
      >
        {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
      </p>

      <div className={`${styleOrderCardDetails.details}`}>
        <p className="text text_type_main-medium mb-6">Состав:</p>

        {filteredArray.map((ingredient: TIngredient) => {
          return (
            <div
              key={ingredient._id}
              className={`${styleOrderCardDetails.scroll} m-2`}
            >
              <IngredientDetails
                image={ingredient.image}
                name={ingredient.name}
                count={counts[ingredient._id]}
                price={ingredient.price}
              />
            </div>
          );
        })}
      </div>
      <div className={styleOrderCardDetails.priceData}>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(currentOrder.createdAt)} />
        </div>
        <div className={styleOrderCardDetails.price}>
          <p className="text text_type_digits-default">
            {filteredArray.reduce(
              (acc: number, ingredient: TIngredient, currentIndex: number) => {
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
  );
};

export default OrderCardDetails;
