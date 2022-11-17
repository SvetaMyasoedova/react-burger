import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";


function App() {
  return (
    <div className="App">
      <AppHeader />

      <main className="main">
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <section className="burgerSection">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </main>
    </div>
  );
}

export default App;
