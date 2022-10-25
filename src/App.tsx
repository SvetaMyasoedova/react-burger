import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
