const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:'This Field is Required',
    },
    password:{
        type:String,
        required:'This Field is Required',
    },
    avatar:{
        type:String,
        required:'This Field is Required',
    }
});
userSchema.methods.hashPassword = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

const User = mongoose.model('User',userSchema);

module.exports = User;