const axiosError = (err) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else {
    console.log(`Error: ${err.message}`);
  }
};

export default axiosError;
