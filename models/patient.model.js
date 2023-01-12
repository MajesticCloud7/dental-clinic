const mongoose = require("mongoose");
const { User } = require("./baseUser.model");

const patientSchema = new mongoose.Schema({
    personalCode: {
        type: Number,
        min: 10000000000,
        max: 99999999999,
        required: true,
    }
});

const Patient = User.discriminator("Patient", patientSchema);

module.exports = { Patient };