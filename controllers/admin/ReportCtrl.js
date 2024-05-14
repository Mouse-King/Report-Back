const Report = require('../../models/ReportModel');

const fetchReports = async (req, res) => {
    const { search } = req.query;
    const reports = await Report.find({
        $or: [{
            name: new RegExp(search, 'i')
        }, {
            url: new RegExp(search, 'i')
        }]
    })
    return res.json(reports)
}

const createReport = async (req, res) => {
    try {
        let data = req.body;
        await Report.create(data);
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

const updateReport = async (req, res) => {
    try {
        const { id } = req.params
        let data = req.body
        await Report.findByIdAndUpdate(id, data)
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

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params
        const report = await Report.findById(id)
        await Report.findByIdAndDelete(id)
        return res.json({
            status: true,
            msg: 'Report successfully deleted.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        })
    }
}

module.exports = {
    fetchReports,
    createReport,
    updateReport,
    deleteReport
}