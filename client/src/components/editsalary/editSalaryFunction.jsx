import axios from "axios";
export const getInforSalaryStaff = async (accessToken, id) => {
  //   console.log("token" + accessToken);
  return await axios
    .get(`http://localhost:5566/get-infor-salary/${id}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createSalary = async (accessToken, data, userId) => {
  //   console.log("token" + accessToken);
  return await axios
    .post(
      "http://localhost:5566/create-salary",
      {
        idUser: userId,
        salaryId: data.salaryId,
        rank: data.rank,
        typeWage: data.typeWage,
        Ot: data.Ot,
        //workDay: data.workDay,
        allowAnce: data.allowAnce,
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
export const updateSalaryStaff = async (accessToken, data, userId) => {
  //   console.log("token" + accessToken);
  return await axios
    .post(
      "http://localhost:5566/update-salary",
      {
        idUser: userId,
        salaryId: data.salaryId,
        rank: data.rank,
        typeWage: data.typeWage,
        Ot: data.Ot,
        workDay: data.workDay,
        allowAnce: data.allowAnce,
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
