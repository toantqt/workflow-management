import axios from "axios";

export const getProfileRoom = (accessToken) => {
  return axios
    .get("http://localhost:5566/get-all-room", {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => console.log(error));
};
export const getInforMember = (accessToken, idroom) => {
  return axios
    .get(`http://localhost:5566/get-infor-user/${idroom}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => console.log(error));
};
export const removeRoom = async (accessToken, userOnl, idroom) => {
  return await axios
    .post(
      "http://localhost:5566/remove-room",
      {
        idUserOnl: userOnl,
        roomId: idroom,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateOwner = async (accessToken, idnewOwner, idroom) => {
  return await axios
    .post(
      "http://localhost:5566/update-owner-room",
      {
        newOwner: idnewOwner,
        roomId: idroom,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
