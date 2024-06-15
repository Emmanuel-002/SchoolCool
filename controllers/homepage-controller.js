const Parent = require('../models/parentSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Classroom = require('../models/sclassSchema.js');

const getAllUsers = async (req, res) => {
    try {
        let parents = await Parent.find();
        let students = await Student.find()
        let teachers = await Teacher.find()
        let classrooms = await Classroom.find()
        console.log({parents,students,teachers,classrooms})
        if (parents && students && teachers && classrooms) {
            // res.send({parents,students,teachers,classrooms});
            res.send({parents,students,teachers,classrooms});
        } else {
            res.send({ message: "No parents found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// const getStudents = async (req, res) => {
//     try {
//         let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
//         if (students.length > 0) {
//             let modifiedStudents = students.map((student) => {
//                 return { ...student._doc, password: undefined };
//             });
//             res.send(modifiedStudents);
//         } else {
//             res.send({ message: "No students found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const getTeachers = async (req, res) => {
//     try {
//         let teachers = await Teacher.find({ school: req.params.id })
//             .populate("teachSubject", "subName")
//             .populate("teachSclass", "sclassName");
//         if (teachers.length > 0) {
//             let modifiedTeachers = teachers.map((teacher) => {
//                 return { ...teacher._doc, password: undefined };
//             });
//             res.send(modifiedTeachers);
//         } else {
//             res.send({ message: "No teachers found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const classroomList = async (req, res) => {
//     try {
//         let classrooms = await Classroom.find({ school: req.params.id })
//         if (classrooms.length > 0) {
//             res.send(classrooms)
//         } else {
//             res.send({ message: "No classroom found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

module.exports = {
    getAllUsers
};