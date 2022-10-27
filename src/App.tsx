import React from "react";
//import logo from "./logo.svg";
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
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
