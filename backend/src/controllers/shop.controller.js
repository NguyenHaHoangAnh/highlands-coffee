const Shop = require('../models/shop.model');
const Area = require('../models/area.model');
const User = require('../models/user.model');
const pagination = require('../middlewares/pagination');

const shopController = {

    // [GET] /shop
    async getAllItem(req, res) {
        Shop.find()
            .then(async (shops) => {
                for (const shop of shops) {
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
                }

                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: shops, message: 'Lấy thông tin quán thành công' });

                const data = pagination.getPaginatedData(req, res, shops.reverse());
                const pageCount = pagination.getPageCount(req, res, shops);

                return res.status(200).json({ data, pageCount, message: 'Lấy thông tin quán thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
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

}

module.exports = shopController;