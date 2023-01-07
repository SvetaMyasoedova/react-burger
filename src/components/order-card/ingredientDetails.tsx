import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styleIngredietDetails from "./ingredient-details.module.css";

interface IDetails {
  name: string;
  count: number;
  price: number;
}
const IngredientDetails: FC<IDetails> = ({ name, count, price }) => {
  return (
    <div className={styleIngredietDetails.main}>
      <div className={styleIngredietDetails.flex}>
        <p>photo</p>
        <p className="text text_type_main-default">{name}</p>
      </div>

      <div  className={styleIngredietDetails.flex}>
        <p className="text text_type_digits-default">
          {count} х {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientDetails;
