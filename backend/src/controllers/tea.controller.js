const Tea = require('../models/tea.model');

const teaController = {

    // [POST] /tea/create
    create(req, res) {
        const newTea = new Tea(req.body);
        newTea.save()
            .then(() => res.status(201).json(newTea))
            .catch((error) => res.status(500).json(error));
    },

    // [PUT] /tea/update/:id
    update(req, res, next) {
        Tea.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json(req.body))
            .catch(next);
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Tea.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Deleted successfully' }))
            .catch(next);
    },
    
    // [GET] /tea
    get(req, res, next) {
        Tea.find()
            .then((tea) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json(tea);

                const page = parseInt(req.query.page);
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(tea.length / perPage);

                // Check if page is valid
                if (!page) page = 1;
                if (page > pageCount) page = pageCount;

                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                const data = tea.reverse().slice(startIndex, endIndex);

                return res.status(200).json(data);
            })
            .catch(next);
    },

    // [GET] /tea/page-count
    getPageCount(req, res, next) {
        Tea.find()
            .then((tea) => {
                if (!req.query.perPage)
                    return res.status(400).json({ error: 'Missing query' });
                
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(tea.length / perPage);

                return res.status(200).json(pageCount);
            })
            .catch(next);
    },

}

module.exports = teaController;