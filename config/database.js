const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Events')
.then(()=>{
console.log('Mongoose Connected Successfully');
})
.catch((err)=>{
   console.log('Mongoose Connected Error ');
console.log(err);
});