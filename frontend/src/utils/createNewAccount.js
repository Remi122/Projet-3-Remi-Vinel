import axios from "axios";
import axiosError from "./axiosError";

/* create a new account function */
const createNewAccount = async (
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
) => {
  e.preventDefault();
  const newAccount = { name: name, email: email, password: password };

  if (emailValidity && passwordValidity) {
    try {
      const response = await axios.post(`${authURL}/signup`, newAccount);
      setSuccesMessage(response.data.message);
      setErrorMessage("");
      setPassword("");
      setName("");
      navigate("/");
    } catch (err) {
      if (
        err.response.data.error.errors.email.kind === "unique" &&
        err.response.data.error.errors.email.path === "email"
      ) {
        setErrorMessage("Cette adresse email dispose déjà d'un compte .");
      } else if (err.response) {
        axiosError(err);
      }
    }
  }
};

export default createNewAccount;
