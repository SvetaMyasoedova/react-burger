import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <BurgerIngredients />
    </div>
  );
}

export default App;
