import { Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../services/actions/profile";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.profileReducer);
  const { email } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
