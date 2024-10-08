import { useEffect, useState } from "react";
import FreezeManagement from "./FreezeManagement";
import CoffeeManagement from "./CoffeeManagement";
import TeaManagement from "./TeaManagement";
import AdminWrapper from "../../components/AdminWrapper";

function DrinksManagement() {
    let url = window.location.href.split('/').pop();
    if (url.includes('?')) url = url.split('?').shift();
    
    const [children, setChildren] = useState();

    useEffect(() => {
        setChildren(
            new Map([
                ['freeze', <FreezeManagement />],
                ['ca-phe', <CoffeeManagement />],
                ['tra', <TeaManagement />],
            ]).get(url)
        );
    }, [url]);

    return (
        <AdminWrapper>
            {children}
        </AdminWrapper>
    );
}

export default DrinksManagement;