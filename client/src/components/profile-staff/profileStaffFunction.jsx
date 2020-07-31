import axios from "axios";

export const getProfileUser = (accessToken) => {
  return axios
    .get("http://localhost:5566/get-all-user", {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};
