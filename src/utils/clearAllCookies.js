import Cookies from "js-cookie";

export const clearAllCookies = () => {
    const allCookies = Cookies.get();

    Object.keys(allCookies).forEach((name) => {
        Cookies.remove(name, { path: '/' });
    } );
} 