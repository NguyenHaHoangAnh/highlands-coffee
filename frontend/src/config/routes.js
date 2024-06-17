const route = {
    // Customer
    customer_home: '/',
    customer_drinks: '/san-pham',
    customer_freeze: '/freeze',
    customer_coffee: '/ca-phe',
    customer_tea: '/tra',
    customer_drink: '/:drink',

    // Admin
    // Authentication
    admin_login: '/dang-nhap',
    // Dashboard
    admin_dashboard: '/trang-chu',
    // Profile
    admin_profile: '/ho-so',
    // Area management
    admin_area_management: '/quan-ly-khu-vuc',
    // Staff management
    admin_staff_management: '/quan-ly-nhan-vien',
    // Shop management
    admin_shop_management: '/quan-ly-quan',
    // Drinks management
    admin_freeze_management: '/quan-ly-thuc-don/freeze',
    admin_coffee_management: '/quan-ly-thuc-don/ca-phe',
    admin_tea_management: '/quan-ly-thuc-don/tra',
};

export default route;