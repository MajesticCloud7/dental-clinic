const mongoose = require("mongoose");
const { User } = require("./baseUser.model");

const specialty = Object.freeze(["ENDODONTICS", "ORTHODONTICS", "PROSTHODONTICS", "PERIODONTICS", "PEDIATRIC-DENTISTRY", "ORAL-SURGERY"]);

const doctorSchema = new mongoose.Schema({
    specialty: {
        type: String,
        trim: true,
        enum: specialty,
        required: true,
        default: "ENDODONTICS",
    }
});

const Doctor = User.discriminator("Doctor", doctorSchema);

module.exports = { Doctor };