import * as httpRequest from '~/utils/httpRequest';

export const getAllItem = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('shop');
            return res;
        } else {
            const res = await httpRequest.get('shop', {
                params: {
                    page,
                    perPage,
                }
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getAvailableItem = async () => {
    try {
        const res = await httpRequest.get('shop/available');
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const createItem = async (
    name,
    area,
    address,
    phone_number,
) => {
    try {
        const res = await httpRequest.post('shop/create', {
            name,
            area: {
                _id: area,
            },
            address,
            phone_number,
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updateItem = async (
    id,
    name,
    area,
    address,
    phone_number,
) => {
    try {
        const res = await httpRequest.put(`shop/update/${id}`, {
            name,
            area: {
                _id: area,
            },
            address,
            phone_number,
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const deleteItem = async (id) => {
    try {
        const res = await httpRequest.del(`shop/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}