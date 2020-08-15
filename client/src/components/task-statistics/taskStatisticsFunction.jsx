import axios from "axios";

export const taskStatistic = async (accessToken) => {
  return await axios
    .get("http://localhost:5566/task-statistic", {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
