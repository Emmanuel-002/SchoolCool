import mongoose from "mongoose"

const classroomSchema = new mongoose.Schema({
    blockName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

export default mongoose.model("classroom", classroomSchema);