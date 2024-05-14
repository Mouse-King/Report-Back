const User = require('../../models/UserModel');
const fs = require('fs')
const bcrypt = require('bcrypt')

const fetchUsers = async (req, res) => {
    const { search } = req.query;
    const users = await User.find({
        role: { $ne: 'admin' }, $or: [{
            firstName: new RegExp(search, 'i')
        }, {
            lastName: new RegExp(search, 'i')
        }, {
            email: new RegExp(search, 'i')
        }]
    }).populate('reports')
    return res.json(users)
}

const fetchUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate('reports');
    return res.json(user);
}   


const createUser = async (req, res) => {
    try {
        let data = req.body;
        if(req.file) data.avatar = req.file.filename;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        data.role = 'user';
        data.reports = data.reports.split(",");
        data.status = true;
        await User.create(data);
        return res.json({
            status: true,
            msg: 'Successfully created.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        let data = req.body
        if (req.file) {
            const user = await User.findById(id)
            if (user.avatar && fs.existsSync(`uploads/users/${user.avatar}`)) {
                fs.unlinkSync(`uploads/users/${user.avatar}`)
            }
            data.avatar = req.file.filename
        }
        if (data.password) {
            const salt = bcrypt.genSaltSync(10)
            data.password = bcrypt.hashSync(data.password, salt)
        }
        data.reports = data.reports.split(",");
        await User.findByIdAndUpdate(id, data)
        return res.json({
            status: true,
            msg: 'Successfully updated.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        })
    }
}

const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body;
        await User.findByIdAndUpdate(id, body)
        return res.json({
            status: true,
            msg: 'Successfully updated.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (user.avatar && fs.existsSync(user.avatar)) {
            fs.unlinkSync(`uploads/users/${user.avatar}`)
        }
        await User.findByIdAndDelete(id)
        return res.json({
            status: true,
            msg: 'User successfully deleted.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        })
    }
}

module.exports = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    updateUserStatus,
    deleteUser
}