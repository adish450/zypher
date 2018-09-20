var mongoose = require('mongoose');

// Event Schema
var EventSchema = mongoose.Schema({
	Eventname : String,
	Eventdate :{
	  type:Date,
	  default : Date.now()
	} 
});

var Event = mongoose.model("Event",EventSchema);
module.exports = Event;


