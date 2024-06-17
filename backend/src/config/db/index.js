const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('[DB]', 'Connect successfully');
    } catch (error) {
        console.log('[DB]', 'Connect failed');
    }
}

module.exports = { connect }