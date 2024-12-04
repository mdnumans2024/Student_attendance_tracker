const mongoose = require('mongoose');

// Define the schema for the attendance manager
const attendanceManagerSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'Attendance Manager',
            enum: ['Attendance Manager', 'Student'],

        }


});

const AttendanceManager = mongoose.model('AttendanceManager', attendanceManagerSchema);

model.exports = AttendanceManager;