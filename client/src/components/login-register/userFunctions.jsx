import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5566/register", {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    .then((res) => {
      return res.data;
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5566/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("userToken", JSON.stringify(res.data));
      return res.data;
    })
    .catch((error) => console.log(error));
};
