const freezeRouter = require('./freeze.route');
const coffeeRouter = require('./coffee.route');
const teaRouter = require('./tea.route');

const route = (app) => {
    app.use('/freeze', freezeRouter);
    app.use('/coffee', coffeeRouter);
    app.use('/tea', teaRouter);
}

module.exports = route;