const authentification = (res) => {
  const userId = res.data.userId;
  const userName = res.data.userName;
  const role = res.data.role;
  const accessToken = res.data.token;
  const userAuthLinea = { userId, userName, role, accessToken };
  const userAuthJSON = JSON.stringify(userAuthLinea);
  sessionStorage.setItem("groupomaniaId", userAuthJSON);

  return userAuthLinea;
};

export default authentification;
