const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let roomSchema = new Schema({
    namegroup:{type: String},
    owner:{
        ownerId:{type: String},
        ref: 'userModel'
    },
    members:[{
        userId:{type: String}, 
        ref: 'userModel'
    }]
},{
    timestamps:{
            createdAt: 'createAt',
            updatedAt: 'updateAt'
    }
});

module.exports = mongoose.model('Room',roomSchema);