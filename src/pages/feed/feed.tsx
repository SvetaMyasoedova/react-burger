import path from "path";
import { useDispatch, useSelector } from "react-redux";
import OrderCardContainer from "../../components/order-card/order-card-container/OrderCardContainer";
import OrderCard from "../../components/order-card/OrderCard";
import { WS_CURRENT_ORDER } from "../../services/actions/wsActionTypes";
import styleFeed from "./feed.module.css";

type Torder = {
  type: string;
  path: string;
};

export const FeedPage = ({ type, path }: Torder) => {
  const { orders, total, totalToday } = useSelector((state: any) => {
    if (type === "WS_CURRENT_ORDER") {
      return state.wsReducer;
    } else {
      return state.wsProfileReducer;
    }
  });

  const dispatch = useDispatch();
  const handleOpenModal = (order: any) => {
    dispatch({
      payload: { currentOrder: order },
      type: type,
    });
  };
  return (
    <div className={styleFeed.main}>
      <p className="text text_type_main-large mb-15 ">Лента заказов</p>

      <div className={styleFeed.order}>
        <OrderCardContainer
        orders={orders}
        onClick={handleOpenModal}
        pathname={path}
      />
      </div>
      

      <div className="ml-20">
        <div className={`${styleFeed.status} mb-15`}>
          <div>
            <p
              className={`${styleFeed.wrapper} text text_type_main-medium mb-6`}
            >
              Готовы:
            </p>
            {orders
              .filter((order: any) => order.status === "done")
              .slice(0, 5)
              .map((order: any) => {
                return (
                  <p
                    key={order.number}
                    className={`${styleFeed.done} text text_type_digits-default`}
                  >
                    {order.number}
                  </p>
                );
              })}
          </div>
          <div>
            <p
              className={`${styleFeed.wrapper} text text_type_main-medium mb-6`}
            >
              В работе:
            </p>
            {orders
              .filter((order: any) => order.status === "pending")
              .slice(0, 5)
              .map((order: any) => {
                return (
                  <p
                    key={order.number}
                    className={`${styleFeed.pending} text text_type_digits-default`}
                  >
                    {order.number}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="mb-15">
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styleFeed.shadow} text text_type_digits-large`}>
            {total}
          </p>
        </div>
        <div className="mb-15">
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styleFeed.shadow} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </div>
    </div>
  );
};
