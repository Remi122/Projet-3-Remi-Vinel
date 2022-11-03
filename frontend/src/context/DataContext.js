import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// require("dotenv").config({ path: "../../.env" });

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [auth, setAuth] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [emailValidity, setEmailValidity] = useState(true);
  const [passwordValidity, setPasswordValidity] = useState(true);

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9-]+\\.[a-z0-9]{2,3}$");
  const regexPassword = new RegExp(
    "(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,10}"
  );

  // const ROLES = {
  //   User: process.env.USER,
  //   Admin: process.env.ADMIN,
  // };
  const ROLES = {
    User: "Employé(e)",
    Admin: "admin",
  };

  // const authURL = process.env.AUTHURL;
  // const postURL = process.env.POSTURL;
  const authURL = "http://localhost:3000/api/auth";
  const postURL = "http://localhost:3000/api/post";

  const disconnect = () => {
    sessionStorage.clear("groupomaniaId");
    navigate("/");
  };

  return (
    <DataContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        posts,
        setPosts,
        users,
        setUsers,
        errorMessage,
        setErrorMessage,
        succesMessage,
        setSuccesMessage,
        auth,
        setAuth,
        authURL,
        postURL,
        ROLES,
        navigate,
        disconnect,
        data,
        setData,
        regexEmail,
        emailValidity,
        setEmailValidity,
        regexPassword,
        passwordValidity,
        setPasswordValidity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
