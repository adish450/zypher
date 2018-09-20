var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    nodemailer = require('nodemailer'),
    // mongodb = require('mongodb'),
    Event = require("./views/models/event"),
    User = require("./views/models/user");


mongoose.connect("mongodb://intern:QHT8KwmKU84sOrWaWS2Gkq65m5lJ6bg7YDQz9nqbIkFz4neEWAJte5qcIY9MDizEvYrR4FelmlvUIC5TQqDvXA%3D%3D@intern.documents.azure.com:10255/?ssl=true");


var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://intern:QHT8KwmKU84sOrWaWS2Gkq65m5lJ6bg7YDQz9nqbIkFz4neEWAJte5qcIY9MDizEvYrR4FelmlvUIC5TQqDvXA%3D%3D@intern.documents.azure.com:10255/?ssl=true", function(err, client) {
    client.close();
});
mongoose.set('debug', true);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static((__dirname + '/views/models')));


// route for adding a new event
app.post('/create', function(req, res) {
    Event.create({ Eventname: req.body.Eventname, Eventdate: req.body.Eventdate }, function(err, event) {
        if (err)
            console.log(err);
        else
            res.send("Success !!");
    });

});


//route for adding a new user
app.post('/users', function(req, res) {
    User.findOne({ Email: req.body.Email }, function(err, User) {
        console.log(User.Email);
        if (User.Email === req.body.Email)
            res.send("User already Exists !!");
        else {
            User.create({ 'Email': req.body.Email }, function(err, user) {
                res.send("User Created !!");
            });

        }
    });

});


//route for adding a event for the user
app.post('/addEvent', function(req, res) {
    
    //checking if user has already registered for the event
    if (User.EventId === Event._id) 
        console.log("You have already registered for this event");
    // if user has not registered for the event adding a new event for the user
    else { 
        User.findByIdAndUpdate({ _id: "some id" }, { $set: { EventId: Event._id } }, function(err, user) {
            if (err)
                console.log(err);
            else
                var str = 'You are successfully added to the event ' + Event.Eventname;
            console.log(str);

            // sending mail when user is added to an event
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'youremail@gmail.com',
                    pass: 'yourpassword'
                }
            });

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@yahoo.com',
                subject: 'Event Added',
                text: 'A new event has been added to your list'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
});


app.listen(process.env.PORT, process.env.IP, function() {

    console.log("Server is running !");
});
