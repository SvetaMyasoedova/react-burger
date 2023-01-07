import OrderCard from "../../components/order-card/OrderCard";
import styleFeed from "./feed.module.css";

const orderCards = [
  {
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e9",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45ea",
    ],
    _id: "123",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e9",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45ea",
    ],
    _id: "1234",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
];


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
