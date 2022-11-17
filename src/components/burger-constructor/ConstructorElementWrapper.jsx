import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorElementWrapper({
  ingredient,
  index,
  onDelete,
  sortIngredients,
}) {
  ingredient.index = index;

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ["sauce", "main"],
    hover(item, monitor) {
      if (item.index === undefined) {
        return;
      }
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      sortIngredients(dragIndex, hoverIndex);
      //moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag(() => ({
    type: ingredient.type,
    item: ingredient,
  }));

  drag(drop(ref));

  return (
    <div ref={ref} className="mb-2 mr-2">
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          onDelete(ingredient.uuid);
        }}
      />
    </div>
  );
}

// IngredientList.propTypes = {
//   ingredient: ingredientPropTypes,
//   icon: PropTypes.element.isRequired,
//   onClick: PropTypes.func.isRequired,
//   id: PropTypes.string.isRequired,
// };

export default ConstructorElementWrapper;
