import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, FC } from "react";
import { getUser } from "../../services/actions/profile";

type IProtectedRoute = {
  children: React.ReactNode;
  path?: string
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, path, ...rest }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: any) => state.profileReducer);
  const { email } = useSelector((state: any) => state.profileReducer);
  const { isUserLoaded } = useSelector((state: any) => state.profileReducer);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        name && email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
