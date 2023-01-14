const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment };