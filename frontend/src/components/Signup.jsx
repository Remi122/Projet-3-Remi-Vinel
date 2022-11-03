import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import ConnectionBtn from "./ConnectionBtn";

import { ImCross } from "react-icons/im";

import createNewAccount from "../utils/createNewAccount";

const Signup = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    authURL,
    setSuccesMessage,
    errorMessage,
    setErrorMessage,
    navigate,
    regexEmail,
    emailValidity,
    setEmailValidity,
    passwordValidity,
    setPasswordValidity,
    regexPassword,
  } = useContext(DataContext);

  useEffect(() => {
    if (regexEmail.test(email)) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
    }
  }, [email, regexEmail, setEmailValidity]);

  useEffect(() => {
    if (regexPassword.test(password)) {
      setPasswordValidity(true);
    } else {
      setPasswordValidity(false);
    }
  }, [password, regexPassword, setPasswordValidity]);

  return (
    <>
      <h2>Créer votre compte</h2>

      {errorMessage ? (
        <p className="error-message">
          <ImCross />
          {errorMessage}
        </p>
      ) : null}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-input-block">
          <label htmlFor="name">Votre nom</label>
          <input
            autoFocus
            type="text"
            required
            name="name"
            id="name"
            placeholder="Votre Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          {!emailValidity ? (
            <p className="input-not-valid">Exemple : votremail@mail.com</p>
          ) : null}
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
          {!passwordValidity ? (
            <ul className="input-not-valid">
              <li>- 8 caractères minimum</li>
              <li>- Lettre minuscule</li>
              <li>- Lettre majuscule</li>
              <li>- Chiffre</li>
              <li>- Caractère spécial</li>
            </ul>
          ) : null}
        </div>
        <button
          className="main-button"
          style={
            emailValidity && passwordValidity
              ? { background: "#2cff6c" }
              : { background: "#d2ffdf" }
          }
          type="submit"
          onClick={(e) =>
            createNewAccount(
              e,
              name,
              setName,
              email,
              password,
              setPassword,
              authURL,
              setSuccesMessage,
              setErrorMessage,
              navigate,
              emailValidity,
              passwordValidity
            )
          }
        >
          Créer le compte
        </button>
      </form>

      <nav>
        <ConnectionBtn />
      </nav>
    </>
  );
};

export default Signup;
