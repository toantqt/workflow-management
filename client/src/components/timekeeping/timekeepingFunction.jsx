import axios from "axios";

export const createTimeChecking = async (
  accessToken,
  Id,
  monthYear
  // getWeek
) => {
  return await axios
    .post(
      "http://localhost:5566/create-time-keeping",
      {
        userId: Id,
        monthYears: monthYear,
        // weekInMonth: getWeek,
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
      //console.log(error);
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
        isCheck: data.isCheck,
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
      //console.log(error);
    });
};
export const updateTimeNotWork = async (
  accessToken,
  id,
  time,
  // getweek,
  today
) => {
  return await axios
    .post(
      "http://localhost:5566/update-time-not-work",
      {
        userId: id,
        monthYear: time,
        // week: getweek,
        todays: today,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      // if (res.status(500)) {
      //   return true;
      // }
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};
export const ExportExcel = (accessToken, time, user) => {
  return axios
    .get(
      `http://localhost:5566/export-excel-file?timeget=${time}&userId=${user}`,
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};
