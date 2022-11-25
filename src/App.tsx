import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { RegisterPage, LoginPage, ForgotPasswordPage, ResetPassworddPage, ProfilePage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
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
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassworddPage />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
