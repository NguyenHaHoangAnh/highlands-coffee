const pagination = {
    // get data
    getPaginatedData(req, res, data) {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);
        const pageCount = Math.ceil(data.length / perPage);

        // Check if page is valid
        if (!page) page = 1;
        if (page > pageCount) page = pageCount;

        // Calculate start & end index
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const result = data.slice(startIndex, endIndex);

        return result;
    },

    // get page number
    getPageCount(req, res, data) {
        const perPage = parseInt(req.query.perPage);
        const pageCount = Math.ceil(data.length / perPage);

        return pageCount;
    }
}

module.exports = pagination;