import axios from "axios";

export const createTimeChecking = async (
  accessToken,
  Id,
  monthYear,
  getWeek
) => {
  return await axios
    .post(
      "http://localhost:5566/create-time-keeping",
      {
        userId: Id,
        monthYears: monthYear,
        weekInMonth: getWeek,
      },
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

export const Timekeeping = async (accessToken, data) => {
  return await axios
    .post(
      "http://localhost:5566/time-keeping",
      {
        userId: data.userId,
        checkSession: data.checkSession,
        timeChecked: data.timeChecked,
        getToday: data.toDay,
        monthYear: data.monthYear,
        weekInMonth: data.weekInMonth,
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
export const getTimeKeeping = async (accessToken, Time, id) => {
  return await axios
    .post(
      "http://localhost:5566/get-time-keeping",
      {
        userId: id,
        monthYear: Time,
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
