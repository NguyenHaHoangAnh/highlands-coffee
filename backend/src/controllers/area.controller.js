const Area = require('../models/area.model');
const User = require('../models/user.model');
const pagination = require('../middlewares/pagination');

const areaController = {

    // [GET] /area
    async getAllItem(req, res) {
        Area.find()
            .then(async (areas) => {
                for (const area of areas) {
                    await User.findById(area.area_manager._id)
                    .then((data) => {
                        area.area_manager.data = data;
                    })
                    .catch((error) => res.status(400).json({ error }));
                }
                
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: areas, message: 'Lấy thông tin Khu vực thành công' });
                
                const data = pagination.getPaginatedData(req, res, areas.reverse());
                const pageCount = pagination.getPageCount(req, res, areas);

                return res.status(200).json({ data, pageCount, message: 'Lấy thông tin Khu vực thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

    // [GET] /area/:id
    async getItemById(req, res) {
        Area.findById(req.params.id)
            .then(async (area) => {
                await User.findById(area.area_manager._id)
                    .then((data) => {
                        area.area_manager.data = data;
                    })
                    .catch((error) => res.status(400).json({ error }));
                
                return res.status(200).json({ data: area, message: 'Lấy thông tin Khu vực thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

}

module.exports = areaController;