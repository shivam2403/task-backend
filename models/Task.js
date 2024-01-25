const { default: mongoose } = require("mongoose");

const TaskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum: ['Grocery', 'Transport', 'Food', 'Clothes', 'Medicine', 'Sports', 'Technical'],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    due:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum: ['Todo','Ongoing','Completed'],
        required:true,
    }
},{timestamps:true});

module.exports=mongoose.model("Task",TaskSchema);