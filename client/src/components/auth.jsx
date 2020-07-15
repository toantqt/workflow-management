export const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  if (token !== null) {
    return true;
  }
  return false;
};
