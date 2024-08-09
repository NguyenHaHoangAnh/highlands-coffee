const Tea = require('../models/tea.model');
const pagination = require('../middlewares/pagination');

const teaController = {

    // [POST] /tea/create
    create(req, res) {
        const newTea = new Tea(req.body);
        newTea.save()
            .then(() => res.status(200).json({ data: newCoffee, message: 'Tạo thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [PUT] /tea/update/:id
    update(req, res, next) {
        Tea.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({ data: req.body, message: 'Cập nhật thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Tea.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Xóa thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },
    
    // [GET] /tea
    get(req, res, next) {
        Tea.find()
            .then((tea) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: tea, message: 'Lấy dữ liệu thành công' });

                const data = pagination.getPaginatedData(req, res, tea.reverse());
                const pageCount = pagination.getPageCount(req, res, tea);

                return res.status(200).json({ data, pageCount, message: 'Lấy dữ liệu thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

}

module.exports = teaController;