import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/actions/profile";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.profileReducer);
  const { email } = useSelector((state) => state.profileReducer);
  const { isUserLoaded } = useSelector((state) => state.profileReducer);

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
