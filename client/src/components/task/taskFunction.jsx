import axios from "axios";

export const getList = async (accessToken, idTask) => {
  return await axios
    .get(`http://localhost:5566/get-list-task/${idTask}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
