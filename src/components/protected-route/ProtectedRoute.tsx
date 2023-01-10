import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";
import React, { FC } from "react";

export const ProtectedRoute: FC<
  RouteProps & { children?: React.ReactNode }
> = ({ children, path, ...rest }) => {
  const { name, email, isUserLoaded } = useSelector(
    (state: any) => state.profileReducer
  );

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
};
