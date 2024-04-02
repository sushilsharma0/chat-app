import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContex";
import toast from "react-hot-toast";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (!res.ok) {
        // Check if the response status indicates an error
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
}

export default useLogin;
