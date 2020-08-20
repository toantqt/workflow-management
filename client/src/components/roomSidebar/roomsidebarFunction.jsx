import axios from "axios";
export const rmeUserInRoom = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/remove-user-room",
      {
        userOnl: data.idUserOnl,
        _id: data.idRoom,
        idUserRm: data.idUserRm,
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
