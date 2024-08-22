import * as httpRequest from '../utils/httpRequest';

export const createItem = async (product, user, payment, status) => {
    try {
        const res = await httpRequest.post('order/create', {
            product,
            user: {
                name: user.name,
                area: {
                    _id: user.area,
                },
                shop: {
                    _id: user.shop,
                },
                address: user.address,
                phone_number: user.phone_number,
            },
            payment,
            status
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getItemById = async (id) => {
    try {
        const res = await httpRequest.post('order/getById', {
            id
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getPendingItem = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('order/pending');
            return res;
        } else {
            const res = await httpRequest.get('order/pending', {
                params: {
                    page,
                    perPage
                }
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getSuccessItem = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('order/success');
            return res;
        } else {
            const res = await httpRequest.get('order/success', {
                params: {
                    page,
                    perPage
                }
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getCancelItem = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('order/cancel');
            return res;
        } else {
            const res = await httpRequest.get('order/cancel', {
                params: {
                    page,
                    perPage
                }
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updateItem = async (id, product, user, payment, status) => {
    try {
        const res = await httpRequest.put(`order/update/${id}`, {
            product,
            user: {
                name: user.name,
                area: {
                    _id: user.area,
                },
                shop: {
                    _id: user.shop,
                },
                address: user.address,
                phone_number: user.phone_number,
            },
            payment,
            status
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}