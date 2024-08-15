const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shop = new Schema({
    name: { type: String, default: '', required: true },
    area: { 
        _id: { type: mongoose.Schema.Types.ObjectId, required: false },
        data: { type: Object, required: false },
    },
    address: { type: String, default: '', required: true, },
    phone_number: { type: String, default: '', required: true, },
    shop_manager: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false },
        data: { type: Object, required: false },
    },
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Shop', Shop);