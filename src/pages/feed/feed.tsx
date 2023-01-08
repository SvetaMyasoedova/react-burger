import { useSelector } from "react-redux";
import OrderCard from "../../components/order-card/OrderCard";
import styleFeed from "./feed.module.css";

export const FeedPage = () => {
  const { orders, total, totalToday } = useSelector(
    (state: any) => state.wsReducer
  );
  return (
    <div className={styleFeed.main}>
      
      <div className={styleFeed.rightSide}>
      <p className="text text_type_main-large mb-5">Лента заказов</p>
      <div className={styleFeed.scroll}>
         {orders.map((order: any) => {
          return <OrderCard order={order} key={order._id} />;
        })}
      </div>
       
      </div>
      <div className={styleFeed.leftSide}>
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
              className={`${styleFeed.wrapper} text text_type_main-medium bm-6`}
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
