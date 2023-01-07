import IngredientDetails from "./ingredientDetails";
import styleOrderCardDetails from "./order-card-details.module.css";
const OrderCardDetails = () => {
  return (
    <div className={styleOrderCardDetails.main}>
      <p
        className={`${styleOrderCardDetails.number} text text_type_digits-default mb-6`}
      >
        #034533
      </p>
      <p className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
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
