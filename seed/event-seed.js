const db = require('../config/database');
const Event = require('../models/Events');


const newEvent = [
    {
        title:'beach cleaning 1',
        description:'lorem lorem lorem lorem ',
        location:'Syria',
        date:Date.now(),
        created_at:Date.now()
    },
    {
        title:'beach cleaning 2',
        description:'lorem lorem lorem lorem ',
        location:'Qatar',
        date:Date.now(),
        created_at:Date.now()
    },
    {
        title:'beach cleaning 3',
        description:'lorem lorem lorem lorem ',
        location:'UAE',
        date:Date.now(),
        created_at:Date.now()
    },
    {
        title:'beach cleaning 4',
        description:'lorem lorem lorem lorem ',
        location:'Oman',
        date:Date.now(),
        created_at:Date.now()
    },
    {
        title:'beach cleaning 5',
        description:'lorem lorem lorem lorem ',
        location:'Kuwait',
        date:Date.now(),
        created_at:Date.now()
    }
    ];
// // for test the database . 

// let newEvent = new Event({
//  title:'This is event one',
//   description:'This is description one' ,
//   location:'Jordan',
//    date:Date.now()
// });


// newEvent.save()
// .then(()=>{
//     console.log('Data has been added success')
// })
// .catch((er)=>{
//     console.log(er)
// })

Event.insertMany(newEvent)
.then(()=>{
    console.log('Data has been added success')
})
.catch((er)=>{
    console.log(er)
})

