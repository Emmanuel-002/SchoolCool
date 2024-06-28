import Message from '../models/messageSchema.js';
import Parent from '../models/parentSchema.js';
import Student from '../models/studentSchema.js'
import Teacher from '../models/teacherSchema.js';
import Admin from '../models/adminSchema.js';

export const messageCreate = async (req, res) => {
    let recipientID = ''
    const admin = await Admin.findOne({email:req.body.recipientEmail})
    const teacher = await Teacher.findOne({email:req.body.recipientEmail})
    const student = await Student.findOne({email:req.body.recipientEmail})
    const parent = await Parent.findOne({email:req.body.recipientEmail})
    recipientID = admin?.id || teacher?.id || student?.id || parent?.id
    req.body.messageBody.text.date = new Date().toLocaleString()
    try {
        const message = new Message({
            ...req.body,
            recipientID
        })
        const result = await message.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getMessage = async (req, res) => {
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

export const messageList = async (req, res) => {
    try {
        let sent = await Message.find({authorID: req.params.id});
        let received = await Message.find({recipientID:req.params.id});
        let messages = [...sent,...received]
        messages = messages.sort((a,b)=>b.createdAt-a.createdAt)
        if (messages.length > 0) {
            res.send(messages)
        } else {
            res.send({ message: "No Message found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const replyMessage = async (req, res) => {
    try {
        let result = await Message.findByIdAndUpdate(req.params.id,
            { $set: {responseBody:{text:{
                authorEmail: req.body.authorEmail,
                authorID:req.body.authorID,
                body:req.body.text,
                date: new Date().toLocaleString(),
            }}} },
            { new: true }
        );
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};