import OrderCard from "../../components/order-card/OrderCard";
import styleFeed from "./feed.module.css";

export const FeedPage = () => {
  return (
    <div className={styleFeed.main}>
      <div className={styleFeed.rightSide}>
        <p className="text text_type_main-large mb-5">Лента заказов</p>
        <OrderCard />
        <OrderCard />
      </div>
      <div className={styleFeed.leftSide}>
        <div className={`${styleFeed.status} mb-15`}>
          <p className={`${styleFeed.wrapper} text text_type_main-medium`}>
            Готовы:
          </p>
          <p className={`${styleFeed.wrapper} text text_type_main-medium`}>
            В работе:
          </p>
        </div>
        <div className="mb-15">
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styleFeed.shadow} text text_type_digits-large`}>
            28 752
          </p>
        </div>
        <div className="mb-15">
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styleFeed.shadow} text text_type_digits-large`}>
            138
          </p>
        </div>
      </div>
    </div>
  );
};
