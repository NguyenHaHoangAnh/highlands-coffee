import { accentsHandler } from "./accentsHandler";

export const slugHandler = {
    getSlug(str) {
        return `/${accentsHandler.removeAccents(str.toLowerCase()).replaceAll(' ', '-')}`;
    }
}