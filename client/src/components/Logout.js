import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          navigate("/login", { replace: true });
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.log(err);
      }
    };

    logoutUser();
  }, [navigate]);

  return <h1>Logging out...</h1>;
};

export default Logout;
