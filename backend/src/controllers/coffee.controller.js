const Coffee = require('../models/coffee.model');
const pagination = require('../middlewares/pagination');

const coffeeController = {

    // [POST] /coffee/create
    create(req, res) {
        const newCoffee = new Coffee(req.body);
        newCoffee.save()
            .then(() => res.status(200).json({ data: newCoffee, message: 'Tạo thành công' }))
            .catch((error) => res.status(500).json({ error }));
    },

    // [PUT] /coffee/update/:id
    update(req, res, next) {
        Coffee.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({ data: req.body, message: 'Cập nhật thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Coffee.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Xóa thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },
    
    // [GET] /coffee
    get(req, res, next) {
        Coffee.find()
            .then((coffee) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json({ data: coffee, message: 'Lấy dữ liệu thành công' });

                const data = pagination.getPaginatedData(req, res, coffee.reverse());
                const pageCount = pagination.getPageCount(req, res, coffee);

                return res.status(200).json({ data, pageCount, message: 'Lấy dữ liệu thành công' });
            })
            .catch((error) => res.status(400).json({ error }));
    },

}

module.exports = coffeeController;