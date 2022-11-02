import stylesList from "./ingredient-list.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientList({ title, image, price, icon, name, count, onClick }) {
  return (
    <div onClick={onClick} className={`${stylesList.wrapper} mb-10`}>
      <img src={image} alt="" className="mb-1" />
      {count > 0 && (
        <div className={stylesList.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
      <div className={`${stylesList.price} mb-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <div>{icon}</div>
      </div>

      <p className="text text_type_main-default ">{name}</p>
    </div>
  );
}

export default IngredientList;
