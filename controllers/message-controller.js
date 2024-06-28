import Message from '../models/messageSchema.js';

export const messageCreate = async (req, res) => {
    req.body.messageBody.text.date = new Date().toLocaleString()
    try {
        const message = new Message(req.body)
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
        let sentMessages = await Message.find({authorID: req.params.id});
        let receivedMessages = await Message.find({recipientEmail:req.body.recipientEmail});
        let messages = [...sentMessages,...receivedMessages]
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
        let message = await Message.findById(req.params.id);
        if (message) {
            recipientEmail = message.recipientEmail;
            message.responseBody.text = {
                authorEmail: req.body.authorEmail,
                authorID:req.body.authorID,
                body:req.body.text,
                date: new Date().toLocaleString(),
            }
        } else {
            res.send({ message: "No message found" });
        }
        message.save()
    } catch (err) {
        res.status(500).json(err);
    }
};

// module.exports = { messageCreate, messageList, getMessage, replyMessage };
