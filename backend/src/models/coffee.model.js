const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coffee = new Schema({
    name: { type: String, default: '', required: true, },
    image: { type: String, default: '', required: true, },
    description: { type: String, default: '', required: true, },
    small: { type: Object, default: {}, required: true, },
    medium: { type: Object, default: {}, required: true, },
    large: { type: Object, default: {}, required: true, },
    }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('Coffee', Coffee);