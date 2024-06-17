const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Freeze = new Schema({
    name: { type: String, default: '', required: true, },
    image: { type: String, default: '', required: true, },
    description: { type: String, default: '', required: true, },
    small: { type: Object, default: {}, required: true, },
    medium: { type: Object, default: {}, required: true, },
    large: { type: Object, default: {}, required: true, },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Freeze', Freeze);