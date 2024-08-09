export const inputHandler = {
    currency(value) {
        if (!value)
            return;
        value = value.toString();
        value =  value.replace(/[^0-9\s]/g, '');
        value = value.replaceAll(',', '');

        return new Intl.NumberFormat('en-US').format(value).toString();
    },

    phone(value) {
        if (!value)
            return;
        value = value.toString();
        value = value.replace(/[^0-9\s]/g, '');
        value = value.replaceAll(' ', '');
        const len = value.length;

        let count = 0;

        for (let i = 1; i <= ((len % 4 === 0) ? Math.floor(len / 4) - 1 : Math.floor(len / 4)); i++) {
            const position = i * 4 + count;
            value = `${value.slice(0, position)} ${value.slice(position)}`;
            count++;
        }

        return value;
    },

    currencyToNumber(value) {
        if (!value)
            return;
        return Number(String(value).replaceAll(',', ''));
    },

    date(value) {
        if (!value)
            return;
        const date = value.split('T').shift();
        return date.split('-').reverse().join('/');
    },

    systemDate(value) {
        if (!value)
            return;
        const date = value.split('T').shift();
        return date.split('/').reverse().join('-');
    }
}