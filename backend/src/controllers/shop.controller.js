const Shop = require('../models/shop.model');
const Area = require('../models/area.model');
const User = require('../models/user.model');
const pagination = require('../middlewares/pagination');

const shopController = {

    // [POST] /shop/create
    create(req, res) {
        const newShop = new Shop(req.body);
        newShop.save()
            .then(() => res.status(200).json({ data: newShop, message: 'Tạo Quán thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [PUT] /shop/update/:id
    update(req, res) {
        Shop.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({ data: req.body, message: 'Cập nhật Quán thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [DELETE] /shop/delete/:id
    delete(req, res) {
        Shop.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Xóa Quán thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [GET] /shop
    async get(req, res) {
        try {
            let shops = await Shop.find();
            const user = await User.findById(req.cookies.id);
            if (user && user.role === 'area_manager') {
                shops = await Shop.find({ 'area._id': user.work_place._id });
            }
            for (const shop of shops) {
                const area = await Area.findById(shop.area._id);
                if (area) {
                    shop.area.data = area;
                }
                const user = await User.findById(shop.shop_manager._id);
                if (user) {
                    shop.shop_manager.data = user;
                }
            }
            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: shops, message: 'Lấy thông tin quán thành công' });

            const data = pagination.getPaginatedData(req, res, shops.reverse());
            const pageCount = pagination.getPageCount(req, res, shops);

            return res.status(200).json({ data, pageCount, message: 'Lấy thông tin quán thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // [GET] /shop/:id
    async getItemById(req, res) {
        Shop.findById(req.params.id)
            .then(async (shop) => {
                await Area.findById(shop.area._id)
                    .then((data) => {
                        shop.area.data = data;
                    })
                    .catch((error) => res.status(400).json({ error }));
                await User.findById(shop.shop_manager._id)
                    .then((data) => {
                        shop.shop_manager.data = data;
                    })
                    .catch((error) => res.status(400).json({ error }));
                
                return res.status(200).json({ data: shop, message: 'Lấy dữ liệu Quán thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

    // [GET] /shop/available
    async getAvailableItem(req, res) {
        try {
            const user = await User.findById(req.cookies.id);
            const shops = await Shop.find({ 'shop_manager._id': undefined || null, 'area._id': user.work_place._id });
            return res.status(200).json({ data: shops, message: 'Lấy thông tin Quán khả dụng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // [POST] /shop/getByArea
    async getByArea(req, res) {
        try {
            const shops = await Shop.find({ 'area._id': req.body.area });
            if (!shops) 
                return res.status(400).json({ error: 'Không tìm thấy Quán' });

            return res.status(200).json({ data: shops, message: 'Lấy thông tin quán thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

}

module.exports = shopController;