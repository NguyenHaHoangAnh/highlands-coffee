const route = {
    // Customer
    customer_home: '/',
    customer_drinks: '/san-pham',
    customer_freeze: '/freeze',
    customer_coffee: '/ca-phe',
    customer_tea: '/tra',
    customer_order: '/don-hang',
    customer_order_research: '/tra-cuu-don-hang',
    customer_drink: '/:drink',

    // Admin
    admin_login: '/dang-nhap',
    admin_profile: '/ho-so',
    admin_dashboard: '/trang-chu',
    // Boss
    boss_area_management: '/quan-ly-khu-vuc',
    boss_area_manager_management: '/quan-ly-quan-ly-khu-vuc',
    boss_shop_management: '/quan-ly-quan',
    boss_freeze_management: '/quan-ly-thuc-don/freeze',
    boss_coffee_management: '/quan-ly-thuc-don/ca-phe',
    boss_tea_management: '/quan-ly-thuc-don/tra',
    // Area Manager
    area_manager_shop_management: '/quan-ly-quan',
    area_manager_shop_manager_management: '/quan-ly-quan-ly-quan',
    // Shop Manager
    shop_manager_staff_management: '/quan-ly-nhan-vien',
    shop_manager_order_management: '/quan-ly-don-hang',
};

export default route;