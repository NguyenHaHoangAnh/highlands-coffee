import AdminWrapper from '../../components/AdminWrapper';
import Breadcrumb from '~/components/Breadcrumb';
import Tab from '~/components/Tab';
import config from '~/config';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import OrderPending from './OrderPending';
import OrderSuccess from './OrderSuccess';
import OrderCancel from './OrderCancel';

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        to: config.routes.admin_dashboard,
        icon: faHouse,
    },
    {
        title: 'Quản lý đơn hàng',
    },
];

const tabs = [
    {
        title: 'Đang xử lý',
        content: <OrderPending />,
    },
    {
        title: 'Đã hoàn thành',
        content: <OrderSuccess />,
    },
    {
        title: 'Đã hủy',
        content: <OrderCancel />,
    },
]

function OrderManagement() {
    return (
        <AdminWrapper>
            <Breadcrumb header='Quản lý đơn hàng' data={BREADCRUMB} />
            <Tab data={tabs} />
        </AdminWrapper>
    );
}

export default OrderManagement;