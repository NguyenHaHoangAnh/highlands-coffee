const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coffee = new Schema({
    name: { type: String, default: '', required: true, },
    image: { type: String, default: '', required: true, },
    description: { type: String, default: '', required: true, },
    small: { type: Object, default: {}, required: true, },
    medium: { type: Object, default: {}, required: true, },
    large: { type: Object, default: {}, required: true, },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

Coffee.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Coffee', Coffee);