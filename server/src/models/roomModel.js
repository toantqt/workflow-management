const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let roomModel = new Schema({
    namegroup:{type: String},
    owner:{
        ownerId:String,
        ref: 'userModel'
    },
    members:[{userId:String, ref: 'userModel'}]
},{
    timestamps:{
            createdAt: 'createAt',
            updatedAt: 'updateAt'
    }
});

module.exports = mongoose.model('Room',roomModel);