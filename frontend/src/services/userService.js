import * as httpRequest from '../utils/httpRequest';

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`user/${id}`);
        return res;
    } catch (error) {
        console.log(error);
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
    }
}