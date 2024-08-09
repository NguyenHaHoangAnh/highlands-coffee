const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Area = new Schema({
    name: { type: String, default: '', required: true, unique: true },
    address: { type: String, default: '', required: true, },
    phone_number: { type: String, default: '', required: true, },
    area_manager: { 
        _id: { type: mongoose.Schema.Types.ObjectId, required: false },
        data: { type: Object, required: false },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

Area.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Area', Area);