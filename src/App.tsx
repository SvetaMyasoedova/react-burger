import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { ingredienstsUrl } from "./utils/urls";

function App() {
  const [state, setState] = useState({
    ingredients: [],
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      const res = await fetch(ingredienstsUrl);
      const data = await res.json();
      setState({ ingredients: data.data });
    };

    getIngredientsData();
  }, []);

  return (
    <div className="App">
      <AppHeader />

      <main className="main">
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <section className="burgerSection">
          <BurgerIngredients ingredients={state.ingredients} />
          <BurgerConstructor ingredients={state.ingredients} />
        </section>
      </main>

      
    </div>
  );
}

export default App;
