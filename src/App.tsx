import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { ingredienstsUrl } from "./utils/urls";
import { IngredientsContext } from "./services/appContext";

function App() {
  // const [ingredients, setIngredients] = useState([]);

  // useEffect(() => {
  //   const getIngredientsData = async () => {
  //     try {
  //       const res = await fetch(ingredienstsUrl);
  //       if (!res.ok) throw new Error(res.statusText);
  //       const data = await res.json();
  //       setIngredients(data.data);
  //     } catch (err) {
  //       console.error("getIngredientsData failed");
  //     }
  //   };

  //   getIngredientsData();
  // }, []);

  return (
    <div className="App">
      <AppHeader />

      <main className="main">
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <section className="burgerSection">
          
            <BurgerIngredients />
            <BurgerConstructor  />
         
        </section>
      </main>
    </div>
  );
}

export default App;
