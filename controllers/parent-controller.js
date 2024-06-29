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
            res.send({ message: "No parent found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}