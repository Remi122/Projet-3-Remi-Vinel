import { useContext } from "react";
import DataContext from "../context/DataContext";
import NewAccountBtn from "./NewAccountBtn";
import useAuth from "../hooks/useAuth";

import { BiCheckCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";

import axios from "axios";
import axiosError from "../utils/axiosError";
import authentification from "../utils/authentification";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    authURL,
    succesMessage,
    setSuccesMessage,
    errorMessage,
    setErrorMessage,
    navigate,
  } = useContext(DataContext);
  const { setAuth } = useAuth();

  /* Connexion function */
  const accountConnexion = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccesMessage("");

    const infoLogin = { email: email, password: password };

    try {
      const response = await axios.post(`${authURL}/login`, infoLogin);
      const userAuthLinea = authentification(response);
      await setAuth({
        userId: userAuthLinea.userId,
        userName: userAuthLinea.userName,
        role: userAuthLinea.role,
        accessToken: userAuthLinea.accessToken,
      });
      setEmail("");
      setPassword("");
      navigate("/groupomania");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
        axiosError(err);
      }
    }
  };

  return (
    <>
      <h2>Connexion</h2>

      {succesMessage ? (
        <p className="succes-message">
          <BiCheckCircle />
          {succesMessage}
        </p>
      ) : null}
      {errorMessage ? (
        <p className="error-message">
          <ImCross />
          {errorMessage}
        </p>
      ) : null}

      <form onSubmit={(e) => accountConnexion(e)}>
        <div className="form-input-block">
          <label htmlFor="email">Adresse email</label>
          <input
            autoFocus
            type="text"
            required
            name="email"
            id="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input-block">
          <label htmlFor="password">Mot de passe</label>
          <input
            autoFocus
            type="password"
            required
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="main-button color-valid" type="submit">
          Se connecter
        </button>
      </form>

      <nav>
        <NewAccountBtn />
      </nav>
    </>
  );
};

export default Login;
