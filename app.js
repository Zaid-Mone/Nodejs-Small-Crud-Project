const express = require('express')
const app = express();
const eventRouter = require('./routes/event-routes');
const userRouter =  require('./routes/user-routes');
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');
var methodOverride = require('method-override')
const passport = require('passport')
const path =require('path');
const passportSetup = require('./config/passport-startup')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// define ejs 
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// define static files
app.use(express.static('public'));
app.use(express.static('node_modules'))
app.use(express.static('uploads'))
// app.use(express.static(path.join(__dirname, 'imgs')));
// app.use(express.static('views/imgs'));
app.use(session({
  secret: 'Zaid',
  resave:false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 15}
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null

  next()
})

app.get('/', (req, res) => {
 res.redirect('/events')
});

app.use('/events',eventRouter);
app.use('/users',userRouter);



app.listen(5000,()=>{
    console.log('Connected to the port 5000');
})