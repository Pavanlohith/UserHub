import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Logout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/logout`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.status === 200) {
          // First update the context
          dispatch({ type: "USER", payload: false });
          // Then navigate
          navigate("/login", { replace: true });
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

    logoutUser();
  }, [navigate, dispatch]);

  return <h1>Logging out...</h1>;
};

export default Logout;
