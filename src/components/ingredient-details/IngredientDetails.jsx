import styleIngredientDetails from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const { currentIngredient } = useSelector(
    (state) => state.сurrentIngredientReducer
  );

  return (
    <div className={styleIngredientDetails.wrapper}>
      <img src={currentIngredient.image} alt="" className="mb-4" />
      <div className="mb-8 text text_type_main-medium">
        {currentIngredient.name}
      </div>

      <div className={`${styleIngredientDetails.nutrients} pb-15`}>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  currentSelectedElem: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
