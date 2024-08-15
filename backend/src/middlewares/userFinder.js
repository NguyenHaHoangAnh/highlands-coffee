const User = require('../models/user.model');
const Area = require('../models/area.model');
const Shop = require('../models/shop.model');

const userFinder = {

    // Find user by role
    async findUserByRole(role) {
        const users = await User.find({ 'role': role });
        if (!users) return users;
        for (const user of users) {
            if (role === 'area_manager') {
                const area = await Area.findById(user.work_place._id);
                user.work_place.data = area;
            } else if (role === 'shop_manager') {
                const shop = await Shop.findById(user.work_place._id);
                user.work_place.data = shop;
            } else if (role === 'staff') {
                const shop = await Shop.findById(user.work_place._id);
                user.work_place.data = shop;
            }
        }

        return users;
    },

}

module.exports = userFinder;