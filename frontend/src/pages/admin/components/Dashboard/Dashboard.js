import { useContext } from 'react';
import { AuthUserContext } from '~/components/AuthUserProvider';
import BossDashBoard from '~/Boss/Dashboard';
import AreaManagerDashBoard from '~/AreaManager/Dashboard';

function Dashboard() {
    const context = useContext(AuthUserContext);
    const user = context && context?.user;

    return (
        <>
            {user && new Map([
                ['admin', <BossDashBoard />],
                ['boss', <BossDashBoard />],
                ['area_manager', <AreaManagerDashBoard />],
            ]).get(user.role.toLowerCase())}
        </>
    );
}

export default Dashboard;