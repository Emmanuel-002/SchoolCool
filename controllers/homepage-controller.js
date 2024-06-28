import Parent from '../models/parentSchema.js'
import Student from '../models/studentSchema.js'
import Teacher from '../models/teacherSchema.js'
import Classroom from '../models/sclassSchema.js'
import Notice from '../models/noticeSchema.js'

export const getHomepageInfo = async (req, res) => {
    try {
        let parents = await Parent.find();
        let students = await Student.find()
        let teachers = await Teacher.find()
        let classrooms = await Classroom.find()
        let notices = await Notice.find()
        if (parents && students && teachers && classrooms && notices) {
            res.send({parents,students,teachers,classrooms,notices});
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// module.exports = {
//     getHomepageInfo
// };