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

export const addTask = (accessToken, task) => {
  return axios
    .post(
      "http://localhost:5566/add-task",
      {
        title: task.title,
        deadline: task.deadline,
        idStaff: task.idStaff,
        roomId: task.roomId,
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

export const findUserAddRoom = async (accessToken, data) => {
  //console.log(data);
  return await axios
    .get(
      `http://localhost:5566/find-user-addroom?findname=${data.find}&roomid=${data.roomId}`,
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

export const addUserRoom = (accessToken, data) => {
  // let users = [];
  // data.members.forEach((e) => {
  //   users.push({ userId: e.idUser });
  // });
  let users = [];
  data.members.forEach(async (e) => {
    await users.push(e.idUser);
  });
  return axios
    .post(
      "http://localhost:5566/add-user-room",
      {
        members: users,
        _id: data._id,
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
