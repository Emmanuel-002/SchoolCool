const Parent = require('../models/parentSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Classroom = require('../models/sclassSchema.js');
const Notice = require('../models/noticeSchema.js')

const getHomepageInfo = async (req, res) => {
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

module.exports = {
    getHomepageInfo
};