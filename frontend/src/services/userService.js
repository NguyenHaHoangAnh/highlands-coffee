import * as httpRequest from '../utils/httpRequest';

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`user/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getAllAreaManager = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('user/area-manager');
            return res;
        } else {
            const res = await httpRequest.get('user/area-manager', {
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

export const getAllShopManager = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('user/shop-manager');
            return res;
        } else {
            const res = await httpRequest.get('user/shop-manager', {
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

export const getAllStaff = async (page, perPage) => {
    try {
        if (!page && !perPage) {
            const res = await httpRequest.get('user/staff');
            return res;
        } else {
            const res = await httpRequest.get('user/staff', {
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

export const createItem = async(
    name,
    birthday,
    gender,
    role,
    work_place,
    phone_number,
    username,
    password,
) => {
    try {
        const res = httpRequest.post('user/create', {
            name,
            birthday,
            gender,
            role,
            work_place: {
                _id: work_place,
            },
            phone_number,
            username,
            password,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updateItem = async(
    id,
    name,
    birthday,
    gender,
    role,
    work_place,
    phone_number,
    username,
    password,
) => {
    try {
        const res = httpRequest.put(`user/update/${id}`, {
            name,
            birthday,
            gender,
            role,
            work_place: {
                _id: work_place,
            },
            phone_number,
            username,
            password,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const deleteItem = async(id) => {
    try {
        const res = httpRequest.del(`user/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
} 