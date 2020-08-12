let Timekeeping = require("../models/TimekeepingModel");

const CreateTimekeeping = async (req, res) => {
  try {
    //  console.log(req.body);
    let checkCreateTimeInWeek = await Timekeeping.CheckCreate(
      req.body.userId,
      req.body.monthYears,
      req.body.weekInMonth
    );
    if (!checkCreateTimeInWeek) {
      let item = {
        userId: req.body.userId,
        monthYear: req.body.monthYears,
        weekInMonth: req.body.weekInMonth,
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
    if (abc.ok) {
      await Timekeeping.updateCountTime(
        checkCreateTimeInWeek._id,
        checkCreateTimeInWeek.countTime + 1
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
    console.log(getTime);
    return res.status(200).json({ getTime });
  } catch (error) {
    return res.status(500).json({
      message: "timekeep failed",
    });
  }
};
module.exports = {
  CheckedTime: CheckedTime,
  CreateTimekeeping: CreateTimekeeping,
  getTimeKeeping: getTimeKeeping,
};
