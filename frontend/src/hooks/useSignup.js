import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContex";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleErrors({
      fullName,
      userName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) {
      return;
    }
    setLoading(true);

    try {
      const data = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });
      const json = await data.json();
      toast.success("signup successful");
      // if (!data.ok) {
      //   // Check if the response status indicates an error
      //   const errorMessage = await data.text();
      //   throw new Error(errorMessage || "sign up failed");
      // }

      if(json.error)
      {
        throw new Error(json.error)
      }

      localStorage.setItem("user", JSON.stringify(json));
      setAuthUser(json);
    } catch (error) {
      console.log(
        "Something went wrong in signup, error in signup controller" +
          error.message
      );
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}

export default useSignup;

const handleErrors = ({
  fullName,
  userName,
  email,
  password,
  confirmPassword,
  gender,
}) => {
  if (
    !fullName ||
    !userName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("All fields are required");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Confirm password does not match!!");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password length must be greater than 8");
    return false;
  }

  return true;
};
