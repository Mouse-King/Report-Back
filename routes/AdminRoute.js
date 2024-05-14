const express = require('express')
const path = require('path')
const multer = require('multer')
const router = express.Router()
const UserCtrl = require('../controllers/admin/UserCtrl');
const ReportCtrl = require('../controllers/admin/ReportCtrl');

const userStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/users')
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const userMulter = multer({ storage: userStorage })

/******************* USER MANAGEMENT ENDPOINT ********************/
router.get('/users', UserCtrl.fetchUsers);
router.get('/users/:id', UserCtrl.fetchUserById);
router.post('/users', userMulter.single('avatar'), UserCtrl.createUser);
router.put('/users/:id', userMulter.single('avatar'), UserCtrl.updateUser);
router.put('/users/:id/status', UserCtrl.updateUserStatus);
router.delete('/users/:id', UserCtrl.deleteUser);

/******************* Report MANAGEMENT ENDPOINT ********************/
router.get('/reports', ReportCtrl.fetchReports);
router.post('/report', ReportCtrl.createReport);
router.put('/report/:id', ReportCtrl.updateReport);
router.delete('/report/:id', ReportCtrl.deleteReport);

module.exports = router;
