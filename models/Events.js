const mongoose = require('mongoose');



const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now()
        // required:true,
    }
});

// eventSchema.path('title').validate(()=>{return false},'Title can not be empty');
// eventSchema.path('description').validate(()=>{return false},'Description can not be empty');
// eventSchema.path('location').validate(()=>{return false},'Location can not be empty');
// eventSchema.path('date').validate(()=>{return false},'Fate can not be empty');

const Event = mongoose.model('Event',eventSchema);

module.exports = Event;