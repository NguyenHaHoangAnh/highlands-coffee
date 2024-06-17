import { createContext, useEffect, useState } from "react";

import config from '~/config';

const HeaderContext = createContext();

function HeaderProvider({ children }) {
    const url = `/${window.location.href.split('/').pop()}`;
    const [link, setLink] = useState(url);

    const handleLink = (url) => {
        setLink(url);
    }

    const value = {
        link,
        handleLink,
    };

    useEffect(() => {
        const newUrl = `/${window.location.href.split('/').pop()}`;
        switch(newUrl) {
            case '/coffee':
                setLink(config.routes.customer_drinks);
                break;
            case '/freeze':
                setLink(config.routes.customer_drinks);
                break;
            case '/tea':
                setLink(config.routes.customer_drinks);
                break;
            default:
                break;
        }
    }, [link]);

    useEffect(() => {
        // console.log('[link]', link);
    }, [link]);

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
}

export { HeaderContext, HeaderProvider };