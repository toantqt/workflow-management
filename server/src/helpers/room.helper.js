const roomModel = require("../models/roomModel");
//const lodash = require("lodash");
let addRoom = (ownerId, roomName, memberId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // dua owner vao array nhom
      //memberId.unshift({ userId: `${ownerId}` });
      //memberId = lodash.uniqBy(memberId, "userId"); // gom phan tu trung lai

      let createRoom = {
        nameRoom: roomName,
        ownerId: ownerId,
        members: memberId,
      };
      //console.log(createRoom);
      await roomModel.createNew(createRoom);
      resolve("done");
    } catch (error) {
      reject("problem in create helper");
    }
  });
};

module.exports = {
  addRoom: addRoom,
};
