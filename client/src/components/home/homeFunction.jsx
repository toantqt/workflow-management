import axios from "axios";

//get list room
export const getListRoom = async (accessToken) => {
  //   console.log("token" + accessToken);
  return await axios
    .get("http://localhost:5566/getroom", {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
