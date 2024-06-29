import bcrypt from 'bcrypt'
import Parent from '../models/parentSchema.js';

export const parentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingParent = await Parent.findOne({
            email:  req.body.email
        });

        if (existingParent) {
            res.send({ message: 'Email already exists' });
        }
        else {
            const parent = new Parent({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass,
            });
            let result = await parent.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const parentLogIn = async (req, res) => {
    try {
        let parent = await Parent.findOne({ email: req.body.email });
        if (parent) {
            const validated = await bcrypt.compare(req.body.password, parent.password);
            if (validated) {
                parent.password = undefined;
                res.send(parent);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Parent not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getParents = async (req, res) => {
    try {
        let parents = await Parent.find();
        if (parents.length > 0) {
            // let modifiedParents = parents.map((parent) => {
            //     return { ...student._doc, password: undefined };
            // });
            res.send(parents);
        } else {
            res.send({ message: "No parents found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getParentDetails = async (req, res) => {
    try {
        let parent = await Parent.findById(req.params.id)
            // .populate("school", "schoolName")
            // .populate("sclassName", "sclassName")
            // .populate("examResult.subName", "subName")
            // .populate("attendance.subName", "subName sessions");
        if (parent) {
            parent.password = undefined;
            res.send(parent);
        }
        else {
            res.send({ message: "No parent found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteParent = async (req, res) => {
    try {
        const result = await Parent.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

export const deleteParents = async (req, res) => {
    try {
        const result = await Parent.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

// const deleteStudentsByClass = async (req, res) => {
//     try {
//         const result = await Student.deleteMany({ sclassName: req.params.id })
//         if (result.deletedCount === 0) {
//             res.send({ message: "No students found to delete" })
//         } else {
//             res.send(result)
//         }
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// const updateStudent = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10)
//             res.body.password = await bcrypt.hash(res.body.password, salt)
//         }
//         let result = await Student.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })

//         result.password = undefined;
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// const updateExamResult = async (req, res) => {
//     const { subName, marksObtained } = req.body;

//     try {
//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send({ message: 'Student not found' });
//         }

//         const existingResult = student.examResult.find(
//             (result) => result.subName.toString() === subName
//         );

//         if (existingResult) {
//             existingResult.marksObtained = marksObtained;
//         } else {
//             student.examResult.push({ subName, marksObtained });
//         }

//         const result = await student.save();
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// const studentAttendance = async (req, res) => {
//     const { subName, status, date } = req.body;

//     try {
//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send({ message: 'Student not found' });
//         }

//         const subject = await Subject.findById(subName);

//         const existingAttendance = student.attendance.find(
//             (a) =>
//                 a.date.toDateString() === new Date(date).toDateString() &&
//                 a.subName.toString() === subName
//         );

//         if (existingAttendance) {
//             existingAttendance.status = status;
//         } else {
//             // Check if the student has already attended the maximum number of sessions
//             const attendedSessions = student.attendance.filter(
//                 (a) => a.subName.toString() === subName
//             ).length;

//             if (attendedSessions >= subject.sessions) {
//                 return res.send({ message: 'Maximum attendance limit reached' });
//             }

//             student.attendance.push({ date, status, subName });
//         }

//         const result = await student.save();
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// const clearAllStudentsAttendanceBySubject = async (req, res) => {
//     const subName = req.params.id;

//     try {
//         const result = await Student.updateMany(
//             { 'attendance.subName': subName },
//             { $pull: { attendance: { subName } } }
//         );
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// const clearAllStudentsAttendance = async (req, res) => {
//     const schoolId = req.params.id

//     try {
//         const result = await Student.updateMany(
//             { school: schoolId },
//             { $set: { attendance: [] } }
//         );

//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// const removeStudentAttendanceBySubject = async (req, res) => {
//     const studentId = req.params.id;
//     const subName = req.body.subId

//     try {
//         const result = await Student.updateOne(
//             { _id: studentId },
//             { $pull: { attendance: { subName: subName } } }
//         );

//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };


// const removeStudentAttendance = async (req, res) => {
//     const studentId = req.params.id;

//     try {
//         const result = await Student.updateOne(
//             { _id: studentId },
//             { $set: { attendance: [] } }
//         );

//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };


// module.exports = {
//     parentRegister,
//     parentLogIn,
//     getParents,
//     getParentDetails,
//     deleteParents,
//     deleteParent,
//     // updateStudent,
//     // studentAttendance,
//     // deleteStudentsByClass,
//     // updateExamResult,

//     // clearAllStudentsAttendanceBySubject,
//     // clearAllStudentsAttendance,
//     // removeStudentAttendanceBySubject,
//     // removeStudentAttendance,
// };