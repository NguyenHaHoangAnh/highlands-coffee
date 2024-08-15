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
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Area', Area);