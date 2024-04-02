import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
