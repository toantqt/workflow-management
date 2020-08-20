import axios from "axios";

export const getList = async (accessToken, idTask) => {
  return await axios
    .get(`http://localhost:5566/get-list-task/${idTask}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const addListTask = async (data) => {
  return await axios
    .post(
      "http://localhost:5566/add-list-task",
      {
        idTask: data.idTask,
        idStaff: data.idStaff,
        name: data.name,
        note: data.note,
      },
      {
        headers: { Authorization: `${data.accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const getDataList = async (accessToken, idList) => {
  return await axios
    .get(`http://localhost:5566/get-data-list/${idList}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const updateTask = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/update-task",
      {
        idTask: data.idTask,
        title: data.title,
        deadline: data.deadline,
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
