import OrderCard from "../OrderCard";
import styleContainer from "./order-card-container.module.css";




interface IContainer {
	pathname: string;
	onClick: (order: any) =>  void;
	orders: any;
  isProfileorders?: boolean;
  
}

const OrderCardContainer = ({orders, onClick, pathname, isProfileorders}: IContainer) => {
	return (
		<div className={styleContainer.сontainer}>
      
        <div className={styleContainer.scroll}>
          {orders.map((order: any) => {
            return (
              <OrderCard
                onClick={onClick}
                pathname={pathname}
                order={order}
                key={order._id}
                isProfileorders={isProfileorders}
              />
            );
          })}
        </div>
      </div>
	)

 };
 
 export default OrderCardContainer;
 