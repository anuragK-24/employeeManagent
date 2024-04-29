const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    desgination: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true})

module.exports = mongoose.model("Employee", EmployeeSchema)