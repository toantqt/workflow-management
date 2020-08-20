import axios from "axios";

//get list room
export const getListRoom = async (accessToken) => {
  //   //console.log("token" + accessToken);
  return await axios
    .get("http://localhost:5566/getroom", {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const getRoomOfUser = async (accessToken, idUser) => {
  //   //console.log("token" + accessToken);
  return await axios
    .post(
      "http://localhost:5566/get-room-user",
      { idUser: idUser },
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

export const getBoardUser = async (accessToken, data) => {
  //   //console.log("token" + accessToken);
  return await axios
    .post(
      "http://localhost:5566/get-board-user",
      { idUser: data.idUser, roomId: data.roomId },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      //console.log(error);
    });
};
