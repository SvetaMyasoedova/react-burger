import React, { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function Tabs({ inViewBuns, inViewSauce, inViewMain }) {
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
    <div style={{ display: "flex" }} className="mb-10">
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
