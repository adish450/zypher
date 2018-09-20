var mongoose = require('mongoose');

// Event Schema
var EventSchema = mongoose.Schema({
	Eventname : String,
	Eventdate : Date,
});

var Event = mongoose.model("Event",EventSchema);
module.exports = Event;

