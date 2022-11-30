import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPassworddPage,
  ProfilePage,
} from "./pages";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute";
import Modal from "./components/modal/Modal";
import IngredientDetails from "./components/ingredient-details/IngredientDetails";
import { getUser } from "./services/actions/profile";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Switch location={background || location}>
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
