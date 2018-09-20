var express         = require('express'),
    app             = express(),
    bodyParser      =   require('body-parser'),
    mongoose        =   require('mongoose'),
    morgan       = require('morgan'),
    nodemailer = require('nodemailer'),
    // mongodb = require('mongodb'),
    Event            =   require("./views/models/event");    


    // var mongoClient = require("mongodb").MongoClient;
    // mongoClient.connect("mongodb://intern:QHT8KwmKU84sOrWaWS2Gkq65m5lJ6bg7YDQz9nqbIkFz4neEWAJte5qcIY9MDizEvYrR4FelmlvUIC5TQqDvXA%3D%3D@intern.documents.azure.com:10255/?ssl=true", function (err, client) {
    //   client.close();
    // });
    mongoose.connect("mongodb://intern:QHT8KwmKU84sOrWaWS2Gkq65m5lJ6bg7YDQz9nqbIkFz4neEWAJte5qcIY9MDizEvYrR4FelmlvUIC5TQqDvXA%3D%3D@intern.documents.azure.com:10255/?ssl=true");


var mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://intern:QHT8KwmKU84sOrWaWS2Gkq65m5lJ6bg7YDQz9nqbIkFz4neEWAJte5qcIY9MDizEvYrR4FelmlvUIC5TQqDvXA%3D%3D@intern.documents.azure.com:10255/?ssl=true", function (err, client) {
      client.close();
    });
mongoose.set('debug',true);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

app.set("view engine", "ejs");
app.use(express.static((__dirname + '/views/models')));
app.post('/create',function(req,res){
    Event.create({Eventname:req.body.Eventname,Eventdate:Date.now()},function(err,event){
        res.send("Success !!");
    });

  });
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });



    app.listen(process.env.PORT,process.env.IP,function(){
        
        console.log("Server is running !");
    });
