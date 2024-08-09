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
    }
}