import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import stylesApp from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPassworddPage,
  ProfilePage,
} from "../../pages";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { getUser } from "../../services/actions/profile";
import { getIngredients } from "../../services/actions/burgerIngredients";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <main className={stylesApp.main}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <section className={stylesApp.burgerSection}>
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

        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientDetails />
        </Route>

        <ProtectedRoute path="/">
          <ProfilePage />
        </ProtectedRoute>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:ingredientId"
          children={
            <Modal onClose={handleModalClose} header={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
