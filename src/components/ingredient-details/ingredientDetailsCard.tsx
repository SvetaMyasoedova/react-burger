import { FC } from "react";
import styleIngredientDetails from "./ingredient-details.module.css";
import { TIngredient } from "../../services/types/data";

interface IIngredientDetailsCard {
  ingredient: TIngredient;
}

const IngredientDetailsCard: FC<IIngredientDetailsCard> = ({ ingredient }) => {
  return (
    <div className={styleIngredientDetails.wrapper}>
      <img src={ingredient.image} alt={ingredient.name} className="mb-4" />
      <div data-test-id="ingredient-name" className="mb-8 text text_type_main-medium">{ingredient.name}</div>

      <div className={`${styleIngredientDetails.nutrients} pb-15`}>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <div data-test-id="ingredient-calories" className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <div data-test-id="ingredient-proteins" className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <div data-test-id="ingredient-fat" className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <div data-test-id="ingredient-carbohydrates" className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}



export default IngredientDetailsCard;
