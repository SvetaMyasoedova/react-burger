import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { WS_CURRENT_ORDER } from "../../services/actions/wsActionTypes";
import { TLocationState } from "../../services/types/location";
import IngredientDetails from "./ingredientDetails";
import styleOrderCardDetails from "./order-card-details.module.css";

interface IOrderDetailsParams {
  orderId: string;
}
interface IOrderDetails {
  orderId: string;
}

const OrderCardDetails = () => {
  const { orders } = useSelector((state: any) => state.wsReducer);
  const { orderId } = useParams<IOrderDetailsParams>();

  const currentOrder = useSelector(
    (state: any) => state.wsReducer.currentOrder
  );
  const location = useLocation<TLocationState>();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length !== 0 && !background) {
      dispatch({
        payload: {currentOrder: orders.find((item: any) => item._id === orderId)},
        type: WS_CURRENT_ORDER,
      });
    }

    if (background && (currentOrder === null || currentOrder === undefined)) {
      dispatch({
        payload: {currentOrder: orders.find((item: any) => item._id === orderId)},
        type: WS_CURRENT_ORDER,
      });
    }
  }, [orders]);

  if (currentOrder === null || currentOrder === undefined) {
    return null;
  }
  return (
    <div className={styleOrderCardDetails.main}>
      <p
        className={`${styleOrderCardDetails.number} text text_type_digits-default mb-6`}
      >
        {currentOrder.number}
      </p>
      <p className="text text_type_main-medium mb-3">
      {currentOrder.name}
      </p>
      <p
        className={` ${styleOrderCardDetails.status} text text_type_main-default mb-15`}
      >
        Выполнен
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styleOrderCardDetails.details}>
        <IngredientDetails
          name={"Флюоресцентная булка R2-D3"}
          count={2}
          price={20}
        />
      </div>
    </div>
  );
};

export default OrderCardDetails;
