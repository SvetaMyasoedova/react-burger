import { FC } from "react";
// import PropTypes from "prop-types";
import styleIngredientDetails from "./ingredient-details.module.css";
// import { ingredientPropTypes } from "../../prop-types/ingredientPropTypes";
import { TIngredient } from "../../services/types/data";

interface IIngredientDetailsCard {
  ingredient: TIngredient;
}

const IngredientDetailsCard: FC<IIngredientDetailsCard> = ({ ingredient }) => {
  return (
    <div className={styleIngredientDetails.wrapper}>
      <img src={ingredient.image} alt={ingredient.name} className="mb-4" />
      <div className="mb-8 text text_type_main-medium">{ingredient.name}</div>

      <div className={`${styleIngredientDetails.nutrients} pb-15`}>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}

// IngredientDetailsCard.propTypes = {
//   ingredient: ingredientPropTypes.isRequired,

// };

export default IngredientDetailsCard;
