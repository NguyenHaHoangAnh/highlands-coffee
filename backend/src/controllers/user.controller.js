const User = require('../models/user.model');
const Area = require('../models/area.model');
const Shop = require('../models/shop.model');
const pagination = require('../middlewares/pagination');

const userController = {

    // [GET] /user/:id
    async getUserById(req, res) {
        await User.findById(req.params.id)
            .then(async (user) => {
                if (user.role === 'area_manager') {
                    await Area.findById(user.work_place._id)
                        .then((data) => {
                            user.work_place.data = data;
                        })
                        .catch((error) => res.status(400).json({ error }));
                } else if (user.role === 'shop_manager' || user.role === 'staff') {
                    await Shop.findById(user.work_place._id)
                        .then((data) => {
                            user.work_place.data = data;
                        })
                        .catch((error) => res.status(400).json({ error }));
                }

                return res.status(200).json({ data: user, message: 'Lấy thông tin User thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

    // [GET] /user/area-manager
    async getAllAreaManager(req, res) {
        User.find({ role: 'area_manager' })
            .then(async (area_managers) => {
                for (const area_manager of area_managers) {
                    await Area.findById(area_manager.work_place._id)
                    .then((data) => {
                        area_manager.work_place.data = data;
                    })
                    .catch((error) => res.status(400).json({ error }));
                }
                
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: area_managers, message: 'Lấy thông tin Quản lý khu vực thành công' });

                const data = pagination.getPaginatedData(req, res, area_managers.reverse());
                const pageCount = pagination.getPageCount(req, res, area_managers);
                
                return res.status(200).json({ data, pageCount, message: 'Lấy thông tin Quản lý khu vực thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

}

module.exports = userController;