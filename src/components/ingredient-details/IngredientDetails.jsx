import styleIngredientDetails from "./ingredient-details.module.css";
import PropTypes from "prop-types";

function IngredientDetails({ currentSelectedElem }) {
  return (
    <div className={styleIngredientDetails.wrapper}>
      <img src={currentSelectedElem.image} alt="" className="mb-4" />
      <div className="mb-8 text text_type_main-medium">
        {currentSelectedElem.name}
      </div>

      <div className={`${styleIngredientDetails.nutrients} pb-15`}>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentSelectedElem.calories}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentSelectedElem.proteins}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentSelectedElem.fat}
          </div>
        </div>
        <div className={styleIngredientDetails.aboutNutrients}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <div className="text text_type_digits-default text_color_inactive">
            {currentSelectedElem.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  currentSelectedElem: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }),
};

export default IngredientDetails;
