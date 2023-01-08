import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { WS_CURRENT_ORDER } from "../../services/actions/wsActionTypes";
import { TLocationState } from "../../services/types/location";
import IngredientDetails from "./ingredientDetails";
import styleOrderCardDetails from "./order-card-details.module.css";

interface IOrderDetailsParams {
  orderId: string;
}

const OrderCardDetails = () => {
  const { orders } = useSelector((state: any) => state.wsReducer);
  const { orderId } = useParams<IOrderDetailsParams>();
  const { data } = useSelector((state: any) => state.dataReducer);
  const currentOrder = useSelector(
    (state: any) => state.wsReducer.currentOrder
  );
  const location = useLocation<TLocationState>();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const [counts, setCounts] = useState<any>({});
  const [filteredArray, setFilteredArray] = useState<any>([]);

  useEffect(() => {
    if (orders.length !== 0 && !background) {
      dispatch({
        payload: {
          currentOrder: orders.find((item: any) => item._id === orderId),
        },
        type: WS_CURRENT_ORDER,
      });
    }

    if (background && (currentOrder === null || currentOrder === undefined)) {
      dispatch({
        payload: {
          currentOrder: orders.find((item: any) => item._id === orderId),
        },
        type: WS_CURRENT_ORDER,
      });
    }
  }, [orders]);

  useEffect(() => {
    if (currentOrder === null || currentOrder === undefined) {
      return;
    }

    const tCounts: any = {};
    currentOrder.ingredients.forEach((id: any, index: any) => {
      tCounts[id] = (tCounts[id] || 0) + 1;
    });

    const tUniqueIngredients = currentOrder.ingredients.filter(
      (v: string, i: number, a: any) => a.indexOf(v) === i
    );

    const tFilteredArray = data.filter((value: any) =>
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

      <div className={`${styleOrderCardDetails.details} mb-2`}>
        <p className="text text_type_main-medium mb-6">Состав:</p>

        {filteredArray.map((ingredient: any) => {
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
      <div className="text text_type_main-default text_color_inactive">
        <FormattedDate date={new Date(currentOrder.createdAt)} />
      </div>
    </div>
  );
};

export default OrderCardDetails;
