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
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

User.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('User', User);