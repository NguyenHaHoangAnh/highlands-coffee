import * as httpRequest from '~/utils/httpRequest';

export const getAllItem = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('area');
            return res;
        } else {
            const res = await httpRequest.get('area', {
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
        const res = await httpRequest.get('area/available');
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const createItem = async (name, address, phone_number) => {
    try {
        const res = await httpRequest.post('area/create', {
            name,
            address,
            phone_number
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updateItem = async (id, name, address, phone_number) => {
    try {
        const res = await httpRequest.put(`area/update/${id}`, {
            name,
            address,
            phone_number
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const deleteItem = async (id) => {
    try {
        const res = await httpRequest.del(`area/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}