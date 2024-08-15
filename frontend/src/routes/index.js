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
import Admin_Profile from '~/pages/admin/components/Profile';
import Admin_Dashboard from '~/pages/admin/Boss/Dashboard';
// Boss
import Boss_AreaManagement from '~/pages/admin/Boss/AreaManagement';
import Boss_AreaManagerManagement from '~/pages/admin/Boss/AreaManagerManagement';
import Boss_ShopManagement from '~/pages/admin/Boss/ShopManagement';
import Boss_DrinksManagement from '~/pages/admin/Boss/DrinksManagement';
// Area Manager
import Area_Manager_ShopManagement from '~/pages/admin/AreaManager/ShopManagement';
import Area_Manager_ShopManagerManagement from '~/pages/admin/AreaManager/ShopManagerManagement';
// Shop Manager
import Shop_Manager_StaffManagement from '~/pages/admin/ShopManager/StaffManagement';

import { AdminLayout } from '~/layouts';

// Không cần đăng nhập
const publicRoutes = [
    // Admin
    { path: config.routes.admin_login, component: Admin_Authentication, layout: null },
    // Customer
    { path: config.routes.customer_home, component: Customer_Home },
    { path: config.routes.customer_drinks, component: Customer_Drinks },
    { path: config.routes.customer_freeze, component: Customer_Freeze },
    { path: config.routes.customer_coffee, component: Customer_Coffee },
    { path: config.routes.customer_tea, component: Customer_Tea },
    { path: config.routes.customer_drink, component: Customer_Drink },
];

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [
    { path: config.routes.admin_profile, component: Admin_Profile, layout: AdminLayout },
    { path: config.routes.admin_dashboard, component: Admin_Dashboard, layout: AdminLayout },
    // Boss
    { path: config.routes.boss_area_management, component: Boss_AreaManagement, layout: AdminLayout },
    { path: config.routes.boss_area_manager_management, component: Boss_AreaManagerManagement, layout: AdminLayout },
    { path: config.routes.boss_shop_management, component: Boss_ShopManagement, layout: AdminLayout },
    { path: config.routes.boss_freeze_management, component: Boss_DrinksManagement, layout: AdminLayout },
    { path: config.routes.boss_coffee_management, component: Boss_DrinksManagement, layout: AdminLayout },
    { path: config.routes.boss_tea_management, component: Boss_DrinksManagement, layout: AdminLayout },
    // Area Manager
    { path: config.routes.area_manager_shop_management, component: Area_Manager_ShopManagement, layout: AdminLayout },
    { path: config.routes.area_manager_shop_manager_management, component: Area_Manager_ShopManagerManagement, layout: AdminLayout },
    // Shop Manager
    { path: config.routes.shop_manager_staff_management, component: Shop_Manager_StaffManagement, layout: AdminLayout },

];

export { publicRoutes, privateRoutes }