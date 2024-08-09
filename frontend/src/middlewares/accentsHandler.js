// Loại bỏ dấu trong Tiếng Việt
export const accentsHandler = {
    removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}