const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const ReportModel = mongoose.model('Report', ReportSchema);

module.exports = ReportModel;


