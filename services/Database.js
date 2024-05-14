const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

const connect = () => {
    console.log(process.env.DB_URL)
    mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000,
        dbName: process.env.DB_NAME
    });

    mongoose.connection.on('connected', () => {
        console.log(`========= DB is connected successfully! ==>: ${process.env.DB_URL} ==========`);
        seedData();
    })
}

const seedData = async () => {
    try {
        const count = await UserModel.find().count();
        if (!count) {
            const salt = bcrypt.genSaltSync(10);
            const admin = {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@gmail.com',
                password: bcrypt.hashSync('password', salt),
                role: 'admin',
                status: true
            }

            await UserModel.create(admin);
            console.log(`============ DB is seeded successfully. =============`);
        }
    } catch (err) {
        console.log(`========= ${err.message} ========`);
    }
}

module.exports = connect;