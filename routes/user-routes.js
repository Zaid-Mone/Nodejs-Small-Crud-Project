const express = require('express')
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uploads/images/'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uuidv4() + '.png');
    }
  })
  var upload = multer({ storage: storage })


isAuthenticated = (req,res,next)=>{
  if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/users/login');
    }
}

router.get('/login',(req,res)=>{
    res.render('user/login',{ error:req.flash('error')})
})

router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true ,
    })
      )


router.get('/signup',(req,res)=>{
    res.render('user/signup',{
        error:req.flash('error')
    })
})


router.post('/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true })
      )





router.get('/profile',isAuthenticated,(req,res)=>{
  
    res.render('user/profile', {
      success: req.flash('success')
  })

})

router.post('/uploadAvatar',upload.single('avatar'),(req,res)=>{
  let newFields = {
    avatar: req.file.filename
}
User.updateOne( {_id: req.user._id}, newFields, (err)=> {
    if (!err) {
        res.redirect('/users/profile')
    }

} )
})

router.get('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if(err){ return next(err);}
    res.redirect('/users/login');
  });
})



module.exports =router;