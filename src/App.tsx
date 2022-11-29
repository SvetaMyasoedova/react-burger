import React from "react";


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {  Route, Switch } from "react-router-dom";

import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { RegisterPage, LoginPage, ForgotPasswordPage, ResetPassworddPage, ProfilePage } from "./pages";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute";

function App() {
  return (
    
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
        {/* <Route path="/profile" exact={true}> */}
        <ProtectedRoute path="/">
        <ProfilePage />
        </ProtectedRoute>
        
        {/* </Route> */}
      </Switch>
    
  );
}

export default App;
