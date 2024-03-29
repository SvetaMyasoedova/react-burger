import { useRef, FC } from "react";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { TIngredient } from "../../services/types/data";

import stylesWrapper from "./wrapper.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IWrapper {
  ingredient: TIngredient;
  index: number;
  onDelete: (ingredient: TIngredient) => void;
  sortIngredients: (dragIndex: number, hoverIndex: number) => void;
}

const ConstructorElementWrapper: FC<IWrapper> = ({
  ingredient,
  index,
  onDelete,
  sortIngredients,
}) => {
  ingredient.index = index;

  const ref = useRef<HTMLInputElement>(null);
  const [, drop] = useDrop({
    accept: ["sauce", "main"],
    hover(item: any, monitor) {
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

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      sortIngredients(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag((): any => ({
    type: ingredient.type,
    item: ingredient,
  }));

  drag(drop(ref));

  return (
    <div ref={ref} className="mb-2">
      <div className={stylesWrapper.drag}>
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {
            onDelete(ingredient);
          }}
        />
      </div>
    </div>
  );
}


export default ConstructorElementWrapper;
