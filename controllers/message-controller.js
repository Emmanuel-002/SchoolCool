const Message = require('../models/messageSchema.js');
const Admin = require('../models/adminSchema')
const Teacher = require('../models/teacherSchema')
const Student = require('../models/studentSchema')
const Parent = require('../models/parentSchema')

const messageCreate = async (req, res) => {
    const admin = await Admin.findOne({email: req.body.recipientEmail})
    const teacher = await Teacher.findOne({email: req.body.recipientEmail})
    const student = await Student.findOne({email: req.body.recipientEmail})
    const parent = await Parent.findOne({email: req.body.recipientEmail})
    let recipientID=
    admin ? admin._id :
    teacher? teacher._id:
    student? student._id:
    parent? parent._id:''
    recipientID = recipientID.toString()
    req.body.messageBody.text.date = new Date().toLocaleString()
    try {
        const message = new Message({
            authorID: req.body.authorID,
            recipientID: recipientID,
            authorName: req.body.authorName,
            messageBody: {...req.body.messageBody},
            school: req.body.school,
        })
        const result = await message.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const getMessage = async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);
        if (message) {
            res.send(message)
        } else {
            res.send({ message: "No message found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const messageList = async (req, res) => {
    try {
        let allMessages = await Message.find();
        let messages = allMessages.filter(message=>message.authorID===req.params.id || message.recipientID===req.params.id)
        // console.log(messages)
        if (messages.length > 0) {
            res.send(messages)
        } else {
            res.send({ message: "No Message found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const replyMessage = async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);
        
        if (message) {
            message.responseBody.text.body = req.body.response;
            message.responseBody.text.date = new Date().toLocaleString()
        } else {
            res.send({ message: "No message found" });
        }
        message.save()
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { messageCreate, messageList, getMessage, replyMessage };
