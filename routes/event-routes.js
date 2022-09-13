const express = require('express')
const router = express.Router();
const Event = require('../models/Events');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
moment().format();

const EventController = require('../controllers/eventController');


isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
          next();
        
      }else{
          res.redirect('/users/login');
      }
  }

// Home Page ( Index )
router.get('/',EventController.homePage); // page number? ==> it's optional (?)

// router.get('/', async (req,res)=>{
//     const events = await Event.find({});
//     res.render('event/index',
//     {
//         events:events,
//         message:req.flash('info')
//     })
// });



// create item 
router.get('/create',isAuthenticated ,EventController.createEventsGet);

// router.get('/create',isAuthenticated , (req,res)=>{
//     res.render('event/create',{
//         errors:req.flash('errors')
//     });
// })
 // Create Post
 router.post('/',
[
    check('title').isLength({min:3}).withMessage('Title is Required'),
    check('description').isLength({min:3}).withMessage('description is Required'),
    check('location').isLength({min:3}).withMessage('location is Required'),
    check('date').isLength({min:3}).withMessage('date is Required'),
]
,EventController.createEventsPost);

// router.post('/',
// [
//     check('title').isLength({min:3}).withMessage('Title is Required'),
//     check('description').isLength({min:3}).withMessage('description is Required'),
//     check('location').isLength({min:3}).withMessage('location is Required'),
//     check('date').isLength({min:3}).withMessage('date is Required'),
// ]

// ,async (req,res)=>{
//     const errors = validationResult(req)

//     if(!errors.isEmpty()){
//         req.flash('errors',errors.array())
//         console.log(errors);
//        res.redirect('/events/create')
//     }
//     else {
//         let event = new Event ({
//             title:req.body.title,
//             description:req.body.description,
//             location:req.body.location,
//             user_id:req.user.id,
//             date:req.body.date
//         })
//         // await event.save();
//         // res.redirect('/events');
//       await event.save( (err)=> {
//             if(!err) {
//                 console.log('event was added')
//                 req.flash('info', ' The event was created successfuly')
//                 res.redirect('/events')
//             } else {
            
//                 console.log(err)
//             } 
//         })
//     //     try{
//     //         await event.save();
//     //         // res.redirect(`/events/${event._id}`)
//     //         res.redirect('/events');
//     //     }
//     //    catch(er){
//     //     res.status(400).send(`ERRRRRRRoRRRR ,,,,,,, ${er}`)
//     //    }
//         //    const event = new Event(req.body);
//         //    await event.save();
//         //    res.redirect('/events');
//     }
    
// })

// get item by id ( Details )
router.get('/:id',isAuthenticated,EventController.EventDetails);
// router.get('/:id',isAuthenticated,async (req,res)=>{
//     const {id} = req.params;
//     const event = await Event.findById(id);
//     res.render('event/show',{event});
// });

// Edit Get
router.get('/:id/edit',EventController.editEventGet);
// router.get('/:id/edit',async (req,res)=>{
//     const {id} = req.params;
//     const event = await Event.findById(id);
//     const eventDate = moment(event.date).format('YYYY-MM-DD');
//     res.render('event/edit',{event , eventDate,errors:req.flash('info')});
// })

// Edit Post
router.put('/:id',isAuthenticated,EventController.ediEventtPost);
// router.put('/:id',isAuthenticated, async (req,res)=>{
//     const {id} = req.params;
//     const event = await Event.findByIdAndUpdate(id,req.body, {runValidators:true,new:true});
//     res.redirect(`/events/${event._id}`)
// });

// Delete Delete
router.delete('/:id',isAuthenticated,EventController.deleteEvent);
// router.delete('/:id',isAuthenticated, async(req,res)=>{
//     const {id} = req.params;
//     const event =await Event.findByIdAndDelete(id);
//     res.redirect('/events')
// })



module.exports = router;