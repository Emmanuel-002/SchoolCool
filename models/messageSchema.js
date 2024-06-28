import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    authorID: {
        type: String,
        required: true
    },
    recipientEmail:{
        type: String,
        // required: true
    },
    authorName: {
        type: String,
        default: 'Anonymous',
        required: true
    },
    messageBody: {
        text:{
            date:{
                type: Date,
            },
            title:{
                type: String,
                required: true
            },
            body:{
                type: String,
                required: true
            },
            authorEmail: {
                type: String,
                required: true
            },
        },
    },
    responseBody: {
        text:{
            date:{
                type: Date,
                default:''
            },
            body:{
                type: String,
                default: ''
            },
            authorEmail:{
                type: String,
                // required: true
            },
            authorID:{
                type: String,
                default:''
            }
        }
    },
});

export default mongoose.model("message", messageSchema);