import stylesBuns from "./ingredient-buns.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientBuns({ title, image, price, icon, name, count }) {
  return (
    <div className="mb-10">
      
        <img src={image} alt="" />
        {count > 0 && (
			<div className={stylesBuns.counter}>
				<Counter count={count} size="default" />
			</div>
        )}
        <div className={stylesBuns.price}>
        <p className="text text_type_digits-default">{price}</p>
        <div>{icon}</div>
      </div>
      
      <p className="text text_type_main-default ">{name}</p>
      
    </div>
  );
}

export default IngredientBuns;
