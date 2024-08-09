const Freeze = require('../models/freeze.model');
const pagination = require('../middlewares/pagination');

const freezeController = {

    // [POST] /freeze/create
    create(req, res) {
        const newFreeze = new Freeze(req.body);
        newFreeze.save()
            .then(() => res.status(200).json({ data: newFreeze, message: 'Tạo thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [PUT] /freeze/update/:id
    update(req, res, next) {
        Freeze.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({ data: req.body, message: 'Cập nhật thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Freeze.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Xóa thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },
    
    // [GET] /freeze
    get(req, res, next) {
        Freeze.find()
            .then((freeze) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: freeze, message: 'Lấy dữ liệu thành công' });

                const data = pagination.getPaginatedData(req, res, freeze.reverse());
                const pageCount = pagination.getPageCount(req, res, freeze);

                return res.status(200).json({ data, pageCount, message: 'Lấy dữ liệu thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

}

module.exports = freezeController;