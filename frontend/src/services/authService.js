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
        return error.response.data;
    }
}

export const logout = async () => {
    try {
        const res = await httpRequest.get('logout');
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}