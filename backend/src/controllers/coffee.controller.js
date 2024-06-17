const Coffee = require('../models/coffee.model');

const coffeeController = {

    // [POST] /coffee/create
    create(req, res) {
        const newCoffee = new Coffee(req.body);
        newCoffee.save()
            .then(() => res.status(201).json(newCoffee))
            .catch((error) => res.status(500).json(error));
    },

    // [PUT] /coffee/update/:id
    update(req, res, next) {
        Coffee.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json(req.body))
            .catch(next);
    },

    // [DELETE] /coffee/delete/:id
    delete(req, res, next) {
        Coffee.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ message: 'Deleted successfully' }))
            .catch(next);
    },
    
    // [GET] /coffee
    get(req, res, next) {
        Coffee.find()
            .then((coffee) => {
                // Check if url not has query => return all
                if (!req.query.page && !req.query.perPage)
                    return res.status(200).json(coffee);

                const page = parseInt(req.query.page);
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(coffee.length / perPage);

                // Check if page is valid
                if (!page) page = 1;
                if (page > pageCount) page = pageCount;

                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                const data = coffee.reverse().slice(startIndex, endIndex);

                return res.status(200).json(data);
            })
            .catch(next);
    },

    // [GET] /coffee/page-count
    getPageCount(req, res, next) {
        Coffee.find()
            .then((coffee) => {
                if (!req.query.perPage)
                    return res.status(400).json({ error: 'Missing query' });
                
                const perPage = parseInt(req.query.perPage);
                const pageCount = Math.ceil(coffee.length / perPage);

                return res.status(200).json(pageCount);
            })
            .catch(next);
    },

}

module.exports = coffeeController;