var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema for Patient in the queue
var patient   = new Schema({
    _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },//Company/Hospital ID
    name: String,
    _doctor_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: false },//Doctor to see, not required?
    checkin_time: { type : Date, default: Date.now },
});

var patientQueue = new mongoose.Schema({
  patients : {type: [patient]},
  _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }
});

module.exports = mongoose.model('PatientQueue', patientQueue);