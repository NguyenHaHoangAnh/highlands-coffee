const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    product: { type: Array, default: [], required: true },
    user: {
        name: { type: String, default: '', required: true },
        area: { 
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, default: '', required: false },
        },
        shop: { 
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, default: '', required: false },
        },
        address: { type: String, default: '', required: true },
        phone_number: { type: String, default: '', required: true },
    },
    payment: {
        type: { type: String, default: '', required: true },
        price: { type: Number, default: 0, required: true },
    },
    status: { type: String, default: '', required: true },
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Order', Order);