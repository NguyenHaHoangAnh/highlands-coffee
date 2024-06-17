import * as httpRequest from '../utils/httpRequest';

export const getAllItem = async () => {
    try {
        const res = await httpRequest.get('freeze');
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getItem = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('freeze', {
            params: {
                page,
                perPage,
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const createItem = async (name, image, description, priceS, priceM, priceL) => {
    try {
        const res = await httpRequest.post('freeze/create', {
            name,
            image,
            description,
            'small': {
                'size': 'S',
                'price': priceS,
            },
            'medium': {
                'size': 'M',
                'price': priceM,
            },
            'large': {
                'size': 'L',
                'price': priceL,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const updateItem = async (id, name, image, description, priceS, priceM, priceL) => {
    try {
        const res = await httpRequest.put(`freeze/update/${id}`, {
            name,
            image,
            description,
            'small': {
                'size': 'S',
                'price': priceS,
            },
            'medium': {
                'size': 'M',
                'price': priceM,
            },
            'large': {
                'size': 'L',
                'price': priceL,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deleteItem = async (id) => {
    try {
        const res = await httpRequest.del(`freeze/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getPageCount = async ({ perPage }) => {
    try {
        const res = await httpRequest.get('freeze/page-count', {
            params: {
                perPage,
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}