import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import stylesList from "./ingredient-list.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../prop-types/ingredientPropTypes";

function IngredientList({ ingredient, icon, onClick, id, type, count }) {
  const [, dragRef] = useDrag(() => ({
    type: type,
    item: ingredient,
  }));

  const location = useLocation();

  const ingredientId = ingredient["_id"];

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={stylesList.link}
    >
      <div
        ref={dragRef}
        id={id}
        onClick={() => {
          onClick(ingredient);
        }}
        className={`${stylesList.wrapper} mb-10`}
      >
        <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
        {count > 0 && (
          <div className={stylesList.counter}>
            <Counter count={count} size="default" />
          </div>
        )}
        <div className={`${stylesList.price} mb-1`}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <div>{icon}</div>
        </div>

        <p className="text text_type_main-default ">{ingredient.name}</p>
      </div>
    </Link>
  );
}

IngredientList.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientList;
