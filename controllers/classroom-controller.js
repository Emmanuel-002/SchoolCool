import Classroom from '../models/classroomSchema.js'
import Student from '../models/studentSchema.js'
import Subject from '../models/subjectSchema.js'
import Teacher from '../models/teacherSchema.js'

export const addClassroom = async (req, res) => {
    try {
        const classroom = new Classroom({
            blockName: req.body.blockName,
            room: req.body.room,
            available: req.body.available,
            school: req.body.adminID,
        });

        const existingClassroom = await Classroom.findOne({
            blockName: req.body.blockName,
            room: req.body.room,
            school: req.body.adminID,
        });

        if (existingClassroom) {
            res.send({ message: 'Sorry this classroom already exists' });
        }
        else {
            const result = await classroom.save();
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const classroomList = async (req, res) => {
    try {
        let classrooms = await Classroom.find({ school: req.params.id })
        if (classrooms.length > 0) {
            res.send(classrooms)
        } else {
            res.send({ message: "No classroom found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getClassroomDetail = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id);
        if (sclass) {
            sclass = await sclass.populate("school", "schoolName")
            res.send(sclass);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// const getSclassStudents = async (req, res) => {
//     try {
//         let students = await Student.find({ sclassName: req.params.id })
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
// }

export const deleteClassroom = async (req, res) => {
    try {
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }
        const deletedStudents = await Student.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedClass);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteClassrooms = async (req, res) => {
    try {
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
}


// module.exports = { addClassroom, classroomList, deleteClassroom, deleteClassrooms, getClassroomDetail };