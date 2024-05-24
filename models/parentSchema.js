const mongoose = require("mongoose")

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation:{
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    address:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "parent"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        // required: true,
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("parent", parentSchema)