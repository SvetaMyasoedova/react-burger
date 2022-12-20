import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { FC } from "react";

type IProtectedRoute = {
  children: React.ReactNode;
  path?: string;
};

export const ProtectedRoute: FC<IProtectedRoute> = ({
  children,
  path,
  ...rest
}) => {
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
