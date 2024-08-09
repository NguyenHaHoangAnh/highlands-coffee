import * as httpRequest from '../utils/httpRequest';

export const login = async (username, password) => {
    try {
        const res = await httpRequest.post('login', {
            username,
            password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}