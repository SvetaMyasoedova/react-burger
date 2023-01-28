import { FC } from "react";
import styleIngredientDetails from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import IngredientDetailsCard from "./ingredientDetailsCard";
import { CURRENT_INGREDIENT } from "../../services/action-types/сurrent-ingredient-types";

import { TIngredient } from "../../services/types/data";
import { TLocationState } from "../../services/types/location";

interface IIngredientDetailsParams {
  ingredientId: string;
}

const IngredientDetails: FC = () => {
  const { ingredientId } = useParams<IIngredientDetailsParams>();
  const dispatch = useDispatch();

  const currentIngredient = useSelector(
    (state: any): TIngredient =>
      state.сurrentIngredientReducer.currentIngredient
  );

  const { data } = useSelector((state: any) => state.dataReducer);

  const location = useLocation<TLocationState>();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (data.length !== 0 && !background) {
      dispatch({
        currentIngredient: data.find(
          (item: TIngredient) => item._id === ingredientId
        ),
        type: CURRENT_INGREDIENT,
      });
    }

    if (
      background &&
      (currentIngredient === null || currentIngredient === undefined)
    ) {
      dispatch({
        currentIngredient: data.find(
          (item: TIngredient) => item._id === ingredientId
        ),
        type: CURRENT_INGREDIENT,
      });
    }
  }, [data]);

  if (currentIngredient === null || currentIngredient === undefined) {
    return null;
  }

  return (
    <>
      {background ? null : (
        <div className={`${styleIngredientDetails.wrapper} pl-10 pr-10 pt-10`}>
          <div className="text text_type_main-large">Детали ингредиента</div>
        </div>
      )}
      <IngredientDetailsCard ingredient={currentIngredient} />
    </>
  );
};

export default IngredientDetails;
