import { createContext, useContext } from "react";
import DataContext from "../context/DataContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { auth, setAuth } = useContext(DataContext);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
