const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, default: '', required: true, unique: true },
    password: { type: String, default: '', required: true, },
    name: { type: String, default: '', required: true, },
    role: { type: String, default: '', required: true, },
    birthday: { type: Date, required: true },
    gender: { type: String, default: '', required: true, },
    work_place: { 
        _id: { type: mongoose.Schema.Types.ObjectId, required: false },
        data: { type: Object, required: false },
    },
    phone_number: { type: String, default: '', required: true },
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('User', User);