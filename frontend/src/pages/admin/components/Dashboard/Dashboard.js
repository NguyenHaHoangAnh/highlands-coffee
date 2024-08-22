import { useContext } from 'react';
import { AuthUserContext } from '~/components/AuthUserProvider';
import BossDashBoard from '~/pages/admin/Boss/Dashboard';
import AreaManagerDashBoard from '~/pages/admin/AreaManager/Dashboard';
import ShopManagerDashBoard from '~/pages/admin/ShopManager/Dashboard';

function Dashboard() {
    const authContext = useContext(AuthUserContext);
    const user = authContext && authContext?.user;

    return (
        <>
            {user && new Map([
                ['admin', <BossDashBoard />],
                ['boss', <BossDashBoard />],
                ['area_manager', <AreaManagerDashBoard />],
                ['shop_manager', <ShopManagerDashBoard />],
                ['staff', <ShopManagerDashBoard />],
            ]).get(user.role.toLowerCase())}
        </>
    );
}

export default Dashboard;