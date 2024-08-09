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
    }
}