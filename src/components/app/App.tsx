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
import { FeedPage } from "../../pages/feed/feed";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { getIngredients } from "../../services/actions/burgerIngredients";
import { TLocationState } from "../../services/types/location";
import { getUser } from "../../services/actions/profile";
import { FeedDetailsPage } from "../../pages/feed/feedDetails";
import { WS_CONNECTION_START } from "../../services/actions/wsActionTypes";
import { WS_PROFILE_CONNECTION_START } from "../../services/actions/wsProfileActionTypes";

function App() {
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
    dispatch({
      type: WS_CONNECTION_START,
    });
    dispatch({
      type: WS_PROFILE_CONNECTION_START,
    });
  }, []);

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
        <Route path="/feed" exact={true}>
          <FeedPage type ={'WS_CURRENT_ORDER'} path={'feed'}/>
        </Route>
        <Route path="/feed/:orderId" exact={true}>
          <FeedDetailsPage />
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
      {background && (
        <Route
          path="/feed/:orderId"
          children={
            <Modal onClose={handleModalClose}>
              <FeedDetailsPage />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
