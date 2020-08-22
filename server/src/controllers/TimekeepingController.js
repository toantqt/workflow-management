let Timekeeping = require("../models/TimekeepingModel");
let getWeekOfMonth = require("date-fns/getWeekOfMonth");
//let isLastDayOfMonth = require("date-fns/isLastDayOfMonth");
let wageModel = require("../models/wageModel");
let xl = require("excel4node");
// Create a new instance of a Workbook class
let wb = new xl.Workbook();

// Add Worksheets to the workbook
let ws = wb.addWorksheet("Sheet 1");
//let ws2 = wb.addWorksheet("Sheet 2");

// Create a reusable style
let style = wb.createStyle({
  font: {
    color: "#FF0800",
    size: 12,
  },
  // numberFormat: "$#,##0.00; ($#,##0.00); -",
});
// create list check time
const getlistDayWeekFirst = (firstDay) => {
  let array = [];
  for (let i = 1; i <= 6; i++) {
    if (i + 1 >= firstDay) {
      console.log(i);
      let abc = {
        dayOfWeek: i + 1,
        morning: false,
        afternoon: false,
        OT: false,
        isDayInMonth: true,
      };
      array.push(abc);
    } else {
      let abc = {
        dayOfWeek: i + 1,
        morning: false,
        afternoon: false,
        OT: false,
      };
      array.push(abc);
    }
  }
  return array;
};

const getlistDayWeekLast = (lastDay) => {
  //let lastDay = 4;
  let array = [];
  for (let i = 1; i <= 6; i++) {
    if (i + 1 > lastDay) {
      let abc = {
        dayOfWeek: i + 1,
        morning: false,
        afternoon: false,
        OT: false,
      };
      array.push(abc);
    } else {
      let abc = {
        dayOfWeek: i + 1,
        morning: false,
        afternoon: false,
        OT: false,
        isDayInMonth: true,
      };
      array.push(abc);
    }
  }
  return array;
};
const getlistDay = () => {
  let array = [];
  for (let i = 1; i <= 6; i++) {
    let abc = {
      dayOfWeek: i + 1,
      morning: false,
      afternoon: false,
      OT: false,
      isDayInMonth: true,
    };
    array.push(abc);
  }
  return array;
};

const CreateTimekeeping = async (req, res) => {
  try {
    //console.log(req.body);
    // let re = getWeekOfMonth(new Date(2020, 7, 31)); // example month 0-11
    //console.log(re);
    let date = new Date();
    if (new Date().getDay() === 0) {
      date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      );
    }
    //  //console.log(new Date().getDate() - 1);
    // get week of month to day
    let getWeekinMonth = getWeekOfMonth(date);
    //let getWeekinMonth = 6;
    console.log("check first day");
    // get last week of month
    let lastDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).getDate();
    //console.log(lastDay);
    let getLastWeekinMonth = getWeekOfMonth(
      new Date(new Date().getFullYear(), new Date().getMonth(), lastDay)
    );

    let checkCreateTimeInWeek = await Timekeeping.CheckCreate(
      req.body.userId,
      req.body.monthYears,
      // req.body.weekInMonth
      getWeekinMonth
    );

    if (!checkCreateTimeInWeek) {
      let list;
      if (getWeekinMonth === 1) {
        // console.log("first");
        let firstDay =
          new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1;
        // console.log(firstDay);
        list = getlistDayWeekFirst(firstDay);
      }
      if (getWeekinMonth === getLastWeekinMonth) {
        let lastDayLastWeek =
          new Date(date.getFullYear(), date.getMonth(), lastDay).getDay() + 1;
        console.log(lastDayLastWeek);
        list = getlistDayWeekLast(lastDayLastWeek);
      }
      if (getWeekinMonth > 1 && getWeekinMonth < getLastWeekinMonth) {
        list = getlistDay();
      }

      let item = {
        userId: req.body.userId,
        monthYear: req.body.monthYears,
        // weekInMonth: req.body.weekInMonth,
        weekInMonth: getWeekinMonth,
        checkedOneWeek: list,
        // checkedOneWeek: [
        //   { dayOfWeek: 2, morning: false, afternoon: false, OT: false },
        //   { dayOfWeek: 3, morning: false, afternoon: false, OT: false },
        //   { dayOfWeek: 4, morning: false, afternoon: false, OT: false },
        //   { dayOfWeek: 5, morning: false, afternoon: false, OT: false },
        //   { dayOfWeek: 6, morning: false, afternoon: false, OT: false },
        //   { dayOfWeek: 7, morning: false, afternoon: false, OT: false },
        // ],
      };
      let createTime = await Timekeeping.createNew(item);
      //console.log("diem danh dau tuan" + createTime);
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
    //console.log(req.body);
    let checkCreateTimeInWeek = await Timekeeping.CheckCreate(
      req.body.userId,
      req.body.monthYear,
      req.body.weekInMonth
    );
    //console.log(typeof checkCreateTimeInWeek);
    // if (!checkCreateTimeInWeek) {
    //   return res.status(500).json({
    //     message: "checked undefinded ",
    //   });
    // }
    //console.log(checkCreateTimeInWeek._id);
    //console.log(typeof req.body.getToday);
    //console.log(req.body.checkSession);
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
    //  //console.log(req.body);
    let getTime = await Timekeeping.getTimekeeping(
      req.body.userId,
      req.body.monthYear
    );
    let getWageUser = await wageModel.getWates(req.body.userId);
    //console.log(getWageUser);
    //console.log(getTime);
    getTime = getTime.sort(getTime.weekInMonth);
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
    //console.log(getWeekinMonth);
    let checkTime = await Timekeeping.checkSessionWorked(
      req.body.userId,
      req.body.monthYear,
      // req.body.week
      getWeekinMonth
    );
    //console.log(req.body.todays);
    let countTimeNotWork = 0;
    checkTime.checkedOneWeek.forEach(async (e) => {
      if (e.isDayInMonth) {
        if (e.dayOfWeek <= req.body.todays && !e.morning && e.dayOfWeek != 7) {
          await countTimeNotWork++;
        }
      }
    });
    checkTime.checkedOneWeek.forEach(async (e) => {
      if (e.isDayInMonth) {
        if (
          e.dayOfWeek <= req.body.todays &&
          !e.afternoon &&
          e.dayOfWeek != 7
        ) {
          await countTimeNotWork++;
        }
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
const exportExcelFile = async (req, res) => {
  try {
    console.log("tai timekeepping");
    //console.log(req.query.timeget);
    //console.log(req.query.userId);
    let getWageUser = await wageModel.getWates(req.query.userId);
    let getTime = await Timekeeping.getTimekeeping(
      req.query.userId,
      req.query.timeget
    );
    let salaryfDay = getWageUser.typeWage / 30;
    let salaryHalfDay = salaryfDay / 2;
    console.log(salaryHalfDay);
    getTime = getTime.sort(getTime.weekInMonth);
    console.log(getWageUser);
    getTime.forEach((ele, i) => {
      let j = 4 * i + 1;
      ws.cell(j, 1)
        .string("Week " + ele.weekInMonth)
        .style(style);
      if (i === 0) {
        j = 1;
      }
      ele.checkedOneWeek.forEach((e, index) => {
        ws.cell(1 + j, index + 1)
          .number(index + 2)
          .style(style);
        ws.cell(2 + j, index + 1)
          .bool(e.morning)
          .style(style)
          .style({ font: { size: 14 } });
        ws.cell(3 + j, index + 1)
          .bool(e.afternoon)
          .style(style)
          .style({ font: { size: 14 } });
      });

      ws.cell(2 + j, 7)
        .formula(`COUNTIF(A${2 + j}:E${2 + j},TRUE)`)
        .style(style);
      ws.cell(3 + j, 7)
        .formula(`COUNTIF(A${3 + j}:E${3 + j},TRUE)`)
        .style(style);
      // tong tuan ngay lam chinh
      ws.cell(2 + j, 8)
        .formula(`SUM(G${2 + j},G${3 + j})`)
        .style(style);
      // tong ngay lam phu
      ws.cell(2 + j, 9)
        .formula(`COUNTIF(F${2 + j}:F${3 + j},TRUE)`)
        .style(style);
    });
    // title tong buoi lam viec chinh trong tuan
    ws.cell(2, 8).string("Count Work").style(style);
    // title tong buoi lam viec phu trong tuan
    ws.cell(2, 9).string("Count OT").style(style);
    ws.cell(2, 10).string("Work").style(style);
    // tong thang buoi lam viec chinh
    ws.cell(3, 10).formula(`SUM(H:H)`).style(style);

    ws.cell(2, 11).string("OT").style(style);
    // tong thang buoi lam viec Them
    ws.cell(3, 11).formula(`SUM(I:I)`).style(style);

    // tong luong lam viec chinh
    ws.cell(2, 12).string("Tổng Chinh").style(style);
    ws.cell(3, 12).formula(`J3*${salaryHalfDay}`).style(style);

    // tong luong lam viec Them
    ws.cell(2, 13).string("Tổng Phụ").style(style);
    ws.cell(3, 13)
      .formula(`(K3/2)*${getWageUser.wageOt}*${salaryfDay}`)
      .style(style);
    // Tong Cong
    ws.cell(2, 14).string("Tổng").style(style);
    ws.cell(3, 14).formula(`SUM(L3,M3)`).style(style);

    let getToday = new Date().getMonth() + 1 + "/" + new Date().getFullYear();
    let exportss = getToday + ".xlsx";
    // console.log(exportss);
    wb.write(`excel.xlsx`);

    return res.status(200).json({ message: "export thanh cong" });
  } catch (error) {
    return res.status(500).json({
      message: "export error",
    });
  }
};
module.exports = {
  CheckedTime: CheckedTime,
  CreateTimekeeping: CreateTimekeeping,
  getTimeKeeping: getTimeKeeping,
  updateTimeNotWork: updateTimeNotWork,
  exportExcelFile: exportExcelFile,
};
