import config from '../config';

// Customer
import Customer_Home from '~/pages/customer/Home';
import Customer_Drinks from '~/pages/customer/Drinks';
import Customer_Freeze from '~/pages/customer/Freeze';
import Customer_Coffee from '~/pages/customer/Coffee';
import Customer_Tea from '~/pages/customer/Tea';
import Customer_Drink from '~/pages/customer/Drink';

// Admin
import Admin_Authentication from '~/pages/admin/components/Authentication';
import Admin_Dashboard from '~/pages/admin/components/Dashboard';
import Admin_Profile from '~/pages/admin/components/Profile';
import Admin_AreaManagement from '~/pages/admin/components/AreaManagement';
import Admin_StaffManagement from '~/pages/admin/components/StaffManagement';
import Admin_ShopManagement from '~/pages/admin/components/ShopManagement';
import Admin_DrinksManagement from '~/pages/admin/components/DrinksManagement';

import { AdminLayout } from '~/layouts';

// Không cần đăng nhập
const publicRoutes = [
    // Customer
    { path: config.routes.customer_home, component: Customer_Home },
    { path: config.routes.customer_drinks, component: Customer_Drinks },
    { path: config.routes.customer_freeze, component: Customer_Freeze },
    { path: config.routes.customer_coffee, component: Customer_Coffee },
    { path: config.routes.customer_tea, component: Customer_Tea },
    { path: config.routes.customer_drink, component: Customer_Drink },
    
    // Admin
    { path: config.routes.admin_login, component: Admin_Authentication, layout: null },
    { path: config.routes.admin_dashboard, component: Admin_Dashboard, layout: AdminLayout },
    { path: config.routes.admin_profile, component: Admin_Profile, layout: AdminLayout },
    { path: config.routes.admin_area_management, component: Admin_AreaManagement, layout: AdminLayout },
    { path: config.routes.admin_staff_management, component: Admin_StaffManagement, layout: AdminLayout },
    { path: config.routes.admin_shop_management, component: Admin_ShopManagement, layout: AdminLayout },
    { path: config.routes.admin_freeze_management, component: Admin_DrinksManagement, layout: AdminLayout },
    { path: config.routes.admin_coffee_management, component: Admin_DrinksManagement, layout: AdminLayout },
    { path: config.routes.admin_tea_management, component: Admin_DrinksManagement, layout: AdminLayout },
]

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [

]

export { publicRoutes, privateRoutes }