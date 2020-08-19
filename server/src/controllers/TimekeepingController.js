let Timekeeping = require("../models/TimekeepingModel");
let getWeekOfMonth = require("date-fns/getWeekOfMonth");
let wageModel = require("../models/wageModel");
const CreateTimekeeping = async (req, res) => {
  try {
    console.log(req.body);
    let re = getWeekOfMonth(new Date(2020, 8, 1)); // example month 0-11
    console.log(re);
    console.log(new Date().getDay());
    let item = {
      wageOt: 1.5,
      typeWage: 7000000,
      userId: req.body.userId,
    };
    await wageModel.createNew(item);
    let date = new Date();
    if (new Date().getDay() === 0) {
      date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      );
    }
    //  console.log(new Date().getDate() - 1);
    let getWeekinMonth = getWeekOfMonth(date);
    //console.log(getWeekinMonth);

    let checkCreateTimeInWeek = await Timekeeping.CheckCreate(
      req.body.userId,
      req.body.monthYears,
      // req.body.weekInMonth
      getWeekinMonth
    );

    if (!checkCreateTimeInWeek) {
      let item = {
        userId: req.body.userId,
        monthYear: req.body.monthYears,
        // weekInMonth: req.body.weekInMonth,
        weekInMonth: getWeekinMonth,
        checkedOneWeek: [
          { dayOfWeek: 2, morning: false, afternoon: false, OT: false },
          { dayOfWeek: 3, morning: false, afternoon: false, OT: false },
          { dayOfWeek: 4, morning: false, afternoon: false, OT: false },
          { dayOfWeek: 5, morning: false, afternoon: false, OT: false },
          { dayOfWeek: 6, morning: false, afternoon: false, OT: false },
          { dayOfWeek: 7, morning: false, afternoon: false, OT: false },
        ],
      };
      let createTime = await Timekeeping.createNew(item);
      // console.log("diem danh dau tuan" + createTime);
      return res.status(200).json(createTime);
    }
    //console.log("update check time" + checkCreateTimeInWeek);
    return res.status(200).json(checkCreateTimeInWeek);
  } catch (error) {
    return res.status(500).json({
      message: "create time error",
    });
  }
};
const CheckedTime = async (req, res) => {
  try {
    console.log(req.body);
    let checkCreateTimeInWeek = await Timekeeping.CheckCreate(
      req.body.userId,
      req.body.monthYear,
      req.body.weekInMonth
    );
    // console.log(typeof checkCreateTimeInWeek);
    // if (!checkCreateTimeInWeek) {
    //   return res.status(500).json({
    //     message: "checked undefinded ",
    //   });
    // }
    // console.log(checkCreateTimeInWeek._id);
    //console.log(typeof req.body.getToday);
    // console.log(req.body.checkSession);
    let abc = await Timekeeping.updateCheckTime(
      checkCreateTimeInWeek._id,
      req.body.getToday,
      req.body.checkSession
    );
    //console.log(abc);
    if (abc.ok && req.body.getToday != 7) {
      await Timekeeping.updateCountTime(
        checkCreateTimeInWeek._id,
        checkCreateTimeInWeek.countTime + 1,
        "timecheck"
      );
    } else {
      await Timekeeping.updateCountTime(
        checkCreateTimeInWeek._id,
        checkCreateTimeInWeek.countTimeOT + 1,
        "ot"
      );
    }
    return res.status(200).json({ message: "update thanh cong" });
  } catch (error) {
    return res.status(500).json({
      message: "timekeep failed",
    });
  }
};
const getTimeKeeping = async (req, res) => {
  try {
    //  console.log(req.body);
    let getTime = await Timekeeping.getTimekeeping(
      req.body.userId,
      req.body.monthYear
    );
    let getWageUser = await wageModel.getWates(req.body.userId);
    // console.log(getWageUser);
    // console.log(getTime);
    return res.status(200).json({ getTime: getTime, getWageUser: getWageUser });
  } catch (error) {
    return res.status(500).json({
      message: "timekeep failed",
    });
  }
};
const updateTimeNotWork = async (req, res) => {
  try {
    //console.log(req.body);
    let getWeekinMonth = getWeekOfMonth(new Date());
    // console.log(getWeekinMonth);
    let checkTime = await Timekeeping.checkSessionWorked(
      req.body.userId,
      req.body.monthYear,
      // req.body.week
      getWeekinMonth
    );
    //console.log(req.body.todays);
    let countTimeNotWork = 0;
    checkTime.checkedOneWeek.forEach(async (e) => {
      if (e.dayOfWeek <= req.body.todays && !e.morning) {
        await countTimeNotWork++;
      }
    });
    checkTime.checkedOneWeek.forEach(async (e) => {
      if (e.dayOfWeek <= req.body.todays && !e.afternoon) {
        await countTimeNotWork++;
      }
    });
    await Timekeeping.updateTimeNotWork(checkTime._id, countTimeNotWork);
    //console.log(countTimeNotWork);
    return res.status(200).json({ countTimeNotWork });
  } catch (error) {
    return res.status(500).json({
      message: "update time not work error",
    });
  }
};
module.exports = {
  CheckedTime: CheckedTime,
  CreateTimekeeping: CreateTimekeeping,
  getTimeKeeping: getTimeKeeping,
  updateTimeNotWork: updateTimeNotWork,
};
