const Event = require('../models/Events');
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const path = require('path');
const { db } = require('../models/Events');



// Home Page
exports.homePage = async (req,res)=>{
   // let pageNo  = 1;
   // if(req.params.pageNo ==0){
   //    let q  = {
   //       skip :5*(pageNo-1),
   //       limit :5,
   //    }
   // }
//    const {userAvatar} = req.file.fileName;
//    console.log(req.file);

   const events = await Event.find({});  //.limit(eventLimit);
   const avt = req.file;
   const ueserImage = await User.find(avt);
   
   res.render('event/index',
   {
       events:events,
       message:req.flash('info'),
        ueserImage
       })
};


// create events (Get)
exports.createEventsGet =  (req,res)=>{

   res.render('event/create',{
       errors:req.flash('errors')
   });
};


// Create events (Post)
exports.createEventsPost =  async (req,res)=>{
   const errors = validationResult(req)

   if(!errors.isEmpty()){
       req.flash('errors',errors.array())
       console.log(errors);
      res.redirect('/events/create')
   }
   else {

       let event = new Event ({
           title:req.body.title,
           description:req.body.description,
           location:req.body.location,
           user_id:req.user.id,
           date:req.body.date
       })
       // await event.save();
       // res.redirect('/events');
     await event.save( (err)=> {
           if(!err) {
               console.log('event was added')
               req.flash('info', ' The event was created successfuly')
               res.redirect('/events')
           } else {
           
               console.log(err)
           } 
       })
   //     try{
   //         await event.save();
   //         // res.redirect(`/events/${event._id}`)
   //         res.redirect('/events');
   //     }
   //    catch(er){
   //     res.status(400).send(`ERRRRRRRoRRRR ,,,,,,, ${er}`)
   //    }
       //    const event = new Event(req.body);
       //    await event.save();
       //    res.redirect('/events');
   }
   
};


// get item by id ( Details )

exports.EventDetails = async (req,res)=>{
//    const {id} = req.params;
   const event = await Event.findById({_id:req.params.id});
   res.render('event/show',{event});
};

// // Display image on index

// exports.DispalyImage = async (req,res)=>{
//     // const {id} = req.params;
//     const ueserImage = await User.findById({_id:req.params.id});
//     res.render('event/show',{ueserImage});
//  };
 

// Edit event ( Get )
exports.editEventGet = async (req,res)=>{
   const {id} = req.params;
   const event = await Event.findById(id);
   const eventDate = moment(event.date).format('YYYY-MM-DD');
   res.render('event/edit',{event , eventDate,errors:req.flash('info')});
};

// Edit event ( PUT )

exports.ediEventtPost = async (req,res)=>{
   const {id} = req.params;
   const event = await Event.findByIdAndUpdate(id,req.body, {runValidators:true,new:true});
   res.redirect(`/events/${event._id}`)
};


// Delete event (Delete)
exports.deleteEvent = async(req,res)=>{
   const {id} = req.params;
   const event =await Event.findByIdAndDelete(id);
   res.redirect('/events')
};
