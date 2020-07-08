const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let taskSchema = new Schema({
    title:{type: String},
    list:[
        {
            name:String,
            key: Boolean,default:false
        }
    ],
    idStaff:{type: String},
    note:{type: String}
},{
    timestamps:{
            createdAt: 'createAt',
            updatedAt: 'updateAt'
    }
});

module.exports = mongoose.model('Task',taskSchema);