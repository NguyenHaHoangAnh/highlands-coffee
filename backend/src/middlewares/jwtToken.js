require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtToken = {
    generate(username, id, role) {
        return jwt.sign({ username, id, role }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });
    }
}

module.exports = jwtToken;