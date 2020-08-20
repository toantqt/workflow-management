import axios from "axios";

export const addRoom = (accessToken, add) => {
  return axios
    .post(
      "http://localhost:5566/add-room",
      {
        nameRoom: add.nameRoom,
        ownerId: add.ownerId,
        member: add.member,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

//find admin room
export const findAdminRoom = async (accessToken, find) => {
  //   //console.log("token" + accessToken);
  return await axios
    .get(
      `http://localhost:5566/finduser/${find}`,

      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
