import axios from "axios";

//get data room
export const getDataRoom = async (accessToken, roomId) => {
  return await axios
    .get(`http://localhost:5566/room/${roomId}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
