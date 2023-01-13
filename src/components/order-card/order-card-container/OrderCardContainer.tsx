import OrderCard from "../OrderCard";
import styleContainer from "./order-card-container.module.css";
import { TOrder } from "../../../services/types/order";

interface IContainer {
  pathname: string;
  onClick: (order: TOrder) => void;
  orders: TOrder[];
  isProfileOrders?: boolean;
}

const OrderCardContainer = ({
  orders,
  onClick,
  pathname,
  isProfileOrders,
}: IContainer) => {
  return (
    <div className={styleContainer.сontainer}>
      <div className={styleContainer.scroll}>
        {orders.map((order: TOrder) => {
          return (
            <OrderCard
              onClick={onClick}
              pathname={pathname}
              order={order}
              key={order._id}
              isProfileOrders={isProfileOrders}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderCardContainer;
