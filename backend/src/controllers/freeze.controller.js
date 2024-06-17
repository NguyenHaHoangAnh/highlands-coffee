const Freeze = require('../models/freeze.model');

const freezeController = {

    // [POST] /freeze/create
    create(req, res) {
        const newFreeze = new Freeze(req.body);
        newFreeze.save()
            .then(() => res.status(201).json(newFreeze))
            .catch((error) => res.status(500).json(error));
    },

    // [PUT] /freeze/update/:id
    update(req, res, next) {
        Freeze.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json(req.body))
            .catch(next);
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Freeze.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Deleted successfully' }))
            .catch(next);
    },
    
    // [GET] /freeze
    get(req, res, next) {
        Freeze.find()
            .then((freeze) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json(freeze);

                const page = parseInt(req.query.page);
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(freeze.length / perPage);

                // Check if page is valid
                if (!page) page = 1;
                if (page > pageCount) page = pageCount;

                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                const data = freeze.reverse().slice(startIndex, endIndex);

                return res.status(200).json(data);
            })
            .catch(next);
    },

    // [GET] /freeze/page-count
    getPageCount(req, res, next) {  
        Freeze.find()
            .then((freeze) => {
                if (!req.query.perPage)
                    return res.status(400).json({ error: 'Missing query' });
                
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(freeze.length / perPage);

                return res.status(200).json(pageCount);
            })
            .catch(next);
    },

}

module.exports = freezeController;