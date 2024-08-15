const Area = require('../models/area.model');
const User = require('../models/user.model');
const pagination = require('../middlewares/pagination');

const areaController = {

    // [POST] /area/create
    create(req, res) {
        const newArea = new Area(req.body);
        newArea.save()
            .then(() => res.status(200).json({ data: newArea, message: 'Tạo thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [PUT] /area/update/:id
    update(req, res) {
        Area.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({ data: req.body, message: 'Cập nhật thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },
    
    // [DELETE] /area/delete/:id
    delete(req, res) {
        Area.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Xóa thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [GET] /area
    getAllItem(req, res) {
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
    getItemById(req, res) {
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
    
    // [GET] /area/available
    async getAvailableItem(req, res) {
        try {
            const areas = await Area.find({ 'area_manager._id': undefined || null });
            return res.status(200).json({ data: areas, message: 'Lấy thông tin Khu vực khả dụng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

}

module.exports = areaController;