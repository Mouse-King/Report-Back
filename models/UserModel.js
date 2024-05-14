const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;


