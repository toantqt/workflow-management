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

export const lockUser = async (accessToken, data) => {
  //console.log(accessToken);
  return await axios
    .post(
      "http://localhost:5566/lock-user",
      {
        idUser: data.idUser,
        status: data.status,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};
