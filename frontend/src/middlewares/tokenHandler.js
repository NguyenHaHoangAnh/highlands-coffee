import { jwtDecode } from 'jwt-decode';

export const tokenHandler = {
    isTokenExpired(token) {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.log('[tokenHandler]', error);
            return true;
        }
    }
}