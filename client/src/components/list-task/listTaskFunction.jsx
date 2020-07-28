import axios from "axios";

export const createWork = async (accessToken, listId) => {
  return await axios
    .post(
      "http://localhost:5566/create-work",
      {
        listId: listId,
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

export const addWork = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/add-work",
      {
        listId: data.listId,
        name: data.nameWork,
        note: data.nameWork,
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

export const addDoing = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/add-doing",
      {
        listId: data.listId,
        name: data.nameDoing,
        note: data.nameDoing,
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

export const addDone = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/add-done",
      {
        listId: data.listId,
        name: data.nameDone,
        note: data.nameDone,
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

export const sendData = async (accessToken, data) => {
  console.log(data);
  // console.log(accessToken);
  return await axios
    .post(
      "http://localhost:5566/update-list-task",
      {
        data: data,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      // return res.data;
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
