import { useState, useEffect, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import stylesTab from "./tab.module.css";

interface ITab {
  inViewBuns: boolean;
  inViewSauce: boolean;
  inViewMain: boolean;
}

const Tabs: FC<ITab> = ({ inViewBuns, inViewSauce, inViewMain }) => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    
    if (inViewBuns) {
      setCurrent("buns");
      return;
    }

    if (inViewSauce) {
      setCurrent("sauce");
      return;
    }

    if (inViewMain) {
      setCurrent("main");
      return;
    }
  }, [inViewBuns, inViewSauce, inViewMain]);
  
  return (
    <div  className={`${stylesTab.main} mb-10`}>
      <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
