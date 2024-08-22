const freezeRouter = require('./freeze.route');
const coffeeRouter = require('./coffee.route');
const teaRouter = require('./tea.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const areaRouter = require('./area.route');
const shopRouter = require('./shop.route');
const orderRouter = require('./order.route');

const route = (app) => {
    app.use('/freeze', freezeRouter);
    app.use('/coffee', coffeeRouter);
    app.use('/tea', teaRouter);
    app.use('/user', userRouter);
    app.use('/area', areaRouter);
    app.use('/shop', shopRouter);
    app.use('/order', orderRouter);
    app.use('/', authRouter);
}

module.exports = route;