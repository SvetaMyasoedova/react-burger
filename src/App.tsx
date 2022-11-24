import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { RegisterPage, LoginPage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" exact={true}>
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
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
