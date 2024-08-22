const User = require('../models/user.model');
const Area = require('../models/area.model');
const Shop = require('../models/shop.model');
const pagination = require('../middlewares/pagination');
const userFinder = require('../middlewares/userFinder');

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

    // [POST] /user/create
    async create(req, res) {
        try {
            const { username, role, work_place } = req.body;
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username đã được sử dụng' });
            }
            // Check role
            if (role === 'area_manager') {
                const area = await Area.findById(work_place._id);
                if (!area.area_manager._id) {
                    const user = await User.create(req.body);
                    await Area.updateOne({ _id: user.work_place._id }, { $set: { area_manager: { _id: user._id, data: user } } });
                    return res.status(200).json({ data: user, message: 'Tạo Quản lý khu vực thành công' });
                } else {
                    return res.status(400).json({ error: 'Khu vực đã có Quản lý' });
                }
            } else if (role === 'shop_manager') {
                const shop = await Shop.findById(work_place._id);
                if (!shop.shop_manager._id) {
                    const user = await User.create(req.body);
                    await Shop.updateOne({ _id: user.work_place._id }, { $set: { shop_manager: { _id: user._id, data: user } } });
                    return res.status(200).json({ data: user, message: 'Tạo Quản lý quán thành công' });
                } else {
                    return res.status(400).json({ error: 'Khu vực đã có Quản lý' });
                }
            } else {
                const user = await User.create(req.body);
                return res.status(200).json({ data: user, message: 'Tạo nhân viên thành công' });
            }
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [PUT] /user/update/:id
    async update(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'Không tìm thấy User' });
            }
            // Check role
            if (user.role === 'area_manager') {
                await Area.updateOne({ _id: user.work_place._id }, { $set: { area_manager: { _id: null, data: null } } });
                await Area.updateOne({ _id: req.body.work_place._id }, { $set: { area_manager: { _id: req.params.id, data: req.body } } });
            } else if (user.role === 'shop_manager') {
                await Shop.updateOne({ _id: user.work_place._id }, { $set: { shop_manager: { _id: null, data: null } } });
                await Shop.updateOne({ _id: req.body.work_place._id }, { $set: { shop_manager: { _id: req.params.id, data: req.body } } });
            }
            await User.updateOne({ _id: req.params.id }, req.body);

            return res.status(200).json({ data: req.body, message: 'Cập nhật User thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [DELETE] /user/delete/:id
    async delete(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'Không tìm thấy User' });
            }
            // Check role
            if (user.role === 'area_manager') {
                await Area.updateOne({ _id: user.work_place._id }, { $set: { area_manager: { _id: null, data: null } } });
            } else if (user.role === 'shop_manager') {
                await Shop.updateOne({ _id: user.work_place._id }, { $set: { shop_manager: { _id: null, data: null } } });
            }
            await User.findByIdAndDelete(req.params.id);
            
            return res.status(200).json({ message: 'Xóa User thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // [GET] /user/area-manager
    async getAllAreaManager(req, res) {
        try {
            const area_managers = await userFinder.findUserByRole('area_manager');
            if (!area_managers) 
                return res.status(404).json({ error: 'Không tìm thấy Quản lý khu vực' });
            
            if (area_managers.length === 0) 
                return res.status(200).json({ error: 'Không tìm thấy Quản lý khu vực' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: area_managers, message: 'Lấy thông tin Quản lý khu vực thành công' });

            const data = pagination.getPaginatedData(req, res, area_managers.reverse());
            const pageCount = pagination.getPageCount(req, res, area_managers);
            
            return res.status(200).json({ data, pageCount, message: 'Lấy thông tin Quản lý khu vực thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [GET] /user/shop-manager
    async getAllShopManager(req, res) {
        try {
            const shop_managers = await userFinder.findUserByRole('shop_manager');
            if (!shop_managers) 
                return res.status(404).json({ error: 'Không tìm thấy Quản lý quán' });

            if (shop_managers.length === 0) 
                return res.status(200).json({ error: 'Không tìm thấy Quản lý quán' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: shop_managers, message: 'Lấy thông tin Quản lý quán thành công' });

            const data = pagination.getPaginatedData(req, res, shop_managers.reverse());
            const pageCount = pagination.getPageCount(req, res, shop_managers);
            
            return res.status(200).json({ data, pageCount, message: 'Lấy thông tin Quản lý quán thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [GET] /user/staff
    async getAllStaff(req, res) {
        try {
            const staff = await userFinder.findUserByRole('staff');
            if (!staff) 
                return res.status(404).json({ error: 'Không tìm thấy Nhân viên' });

            if (staff.length === 0) 
                return res.status(200).json({ error: 'Không tìm thấy Nhân viên' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: staff, message: 'Lấy thông tin Nhân viên thành công' });

            const data = pagination.getPaginatedData(req, res, staff.reverse());
            const pageCount = pagination.getPageCount(req, res, staff);
            
            return res.status(200).json({ data, pageCount, message: 'Lấy thông tin Nhân viên thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

}

module.exports = userController;