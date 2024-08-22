import classNames from "classnames/bind";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from './Header.module.scss';

import images from '~/assets/images';
import config from '~/config';
import Button from "~/components/Button";
import Input from "~/components/Input";
import Menu from "~/components/Menu";
import Image from "~/components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AuthUserContext } from "~/components/AuthUserProvider";
import { faFile, faUser } from "@fortawesome/free-regular-svg-icons";
// import { HeaderContext } from "./HeaderContext";
import { toast } from "react-toastify";

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'Khám phá bưu điện',
        to: '/a',
        children: [
            {
                title: 'Menu đặc biệt',
                to: '/a',
                children: [
                    {
                        title: 'DÒNG CÀ PHÊ ĐẶC BIỆT',
                        to: '/a',
                    },
                    {
                        title: 'TINH HOA TRÀ HIGHLANDS',
                        to: '/a',
                    },
                    {
                        title: 'MENU NGUYÊN BẢN',
                        to: '/a',
                    },
                    {
                        title: 'THỰC ĐƠN MÓN ĂN',
                        to: '/a',
                    },
                ],
            },
        ],
    },
    {
        title: 'Quán cà phê',
        to: '/b',
    },
    {
        title: 'Thực đơn',
        to: config.routes.customer_drinks,
        children: [
            {
                title: 'Cà phê',
                to: config.routes.customer_coffee,
                children: [
                    {
                        title: 'Cà Phê Phin',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'PhinDi',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Cà Phê Espresso',
                        to: config.routes.customer_drinks,
                    },
                ],
            },
            {
                title: 'Freeze',
                to: config.routes.customer_freeze,
                children: [
                    {
                        title: 'Freeze Cà Phê Phin',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Freeze Không Cà Phê',
                        to: config.routes.customer_drinks,
                    },
                ],
            },
            {
                title: 'Trà',
                to: config.routes.customer_tea,
                children: [
                    {
                        title: 'Trà Sen Vàng Mới',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Trà Thạch Đào',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Trà Thanh Đào',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Trà Thạch Vải',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'TRÀ NHIỆT ĐỚI MỚI',
                        to: config.routes.customer_drinks,
                    },
                ],
            },
            {
                title: 'Khác',
                to: config.routes.customer_drinks,
                children: [
                    {
                        title: 'Bánh ngọt',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Merchandise',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Cà Phê Đóng Gói',
                        to: config.routes.customer_drinks,
                    },
                    {
                        title: 'Thực Đơn Giao Hàng',
                        to: config.routes.customer_drinks,
                    },
                ],
            },
        ],
    },
    {
        title: 'Tin tức',
        to: '/c',
    },
    {
        title: 'Về chúng tôi',
        to: '/d',
        children: [
            {
                title: 'Nguồn gốc',
                to: '/a',
            },
            {
                title: 'Dịch  vụ',
                to: '/a',
            },
            {
                title: 'Nghề nghiệp',
                to: '/a',
            },
        ],
    },
    {
        title: 'Nghề nghiệp',
        to: '/e',
    },
    {
        title: 'Mua ngay',
        to: config.routes.customer_order,
        children: [
            {
                title: 'Giỏ hàng của tôi',
                to: config.routes.customer_order,
            },
            {
                title: 'Tra cứu đơn hàng',
                to: config.routes.customer_order_research,
            },
        ]
    },
    {
        title: 'Thẻ',
        to: '/g',
    },
];

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser}/>,
        title: 'Xem hồ sơ',
        to: config.routes.admin_profile,
    },
    {
        icon: <FontAwesomeIcon icon={faFile}/>,
        title: 'Quản lý',
        to: config.routes.admin_dashboard,
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Đăng xuất',
        to: config.routes.home,
        className: 'separate',
    },
];

const ROLE = {
    admin: 'Admin',
    boss: 'Chủ tịch',
    area_manager: 'Quản lý khu vực',
    shop_manager: 'Quản lý quán',
    staff: 'Nhân viên',
};

function Header() {
    // const headerContext = useContext(HeaderContext);
    const authContext = useContext(AuthUserContext);
    const user = authContext && authContext?.user;
    
    const navigate = useNavigate();

    // const handleClick = (link) => {
    //     headerContext.handleLink(link);
    // };

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.to) {
            case config.routes.home:
                // Log out
                authService
                    .logout()
                    .then((data) => {
                        if (data?.message) {
                            toast.success(data?.message);
                            localStorage.removeItem('token');
                            localStorage.removeItem('id');
                            authContext.handleChangeUser();
                            setTimeout(() => {
                                navigate(config.routes.customer_home);
                            }, 200);
                        } else {
                            toast.error(data?.error);
                        }
                    });
                break;
            default:
                break;
        }
    };
    
    return (
        <div className='w-full'>
            <div className={cx('container')}>
                {/* Logo */}
                <Link 
                    to={config.routes.customer_home} 
                    // onClick={() => handleClick(config.routes.customer_home)}
                >
                    <img className={cx('logo')} src={images.white_logo} alt="Logo" />
                </Link>
                <div className='flex flex-1 flex-col items-end justify-between'>
                    {/* Action */}
                    <div className='flex items-center'>
                        <div className={cx('search')}>
                            <Input
                                className={cx('search-input')}
                                type='text'
                                placeholder='Từ khóa'
                            >
                                <Button className={cx('search-btn')}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                                </Button>
                            </Input>
                        </div>
                        {/* Login */}
                        {user ? (
                            <div className='flex justify-end min-w-[210px] max-w-[250px]'>
                                <div className='flex flex-col items-end'>
                                    <span className='text-[14px] text-white font-semibold'>
                                        {user.name}
                                    </span>
                                    <span className='text-[12px] text-gray-200 font-semibold capitalize'>
                                        {ROLE[user.role.toLowerCase()]}
                                    </span>
                                </div>
                                <Menu
                                    className={cx('header-menu-list')}
                                    items={MENU_ITEMS}
                                    placement='bottom-end'
                                    offset={[12, 16]}
                                    onChange={handleMenuChange}
                                    menuPopper={cx('header-menu-popper')}
                                >
                                    <Image className='ml-4 w-[40px] h-[40px] rounded-full' src={''} alt='avatar' />
                                </Menu> 
                            </div>
                        ) : (
                            <Button className={cx('ml-4', 'login-btn')} secondary to={config.routes.admin_login}>Đăng nhập</Button>
                        )}
                    </div>

                    {/* Nav */}
                    <ul className={cx('nav-list')}>
                        {MENU.map((item, index) => (
                            <li className={cx('nav-item')} key={index}>
                                <NavLink 
                                    className={(nav) => cx('flex justify-center items-center p-4 font-bold uppercase',
                                        'nav-item-link', 
                                        { active: nav.isActive }
                                    )}
                                    to={item.to} 
                                    // onClick={() => handleClick(item.to)}
                                >
                                    {item.title}
                                </NavLink>
                                {item.children && 
                                    <div className={cx('sub-nav-wrapper')}>
                                        <div className='flex'>
                                            <div className='grid grid-cols-4 flex-1'>
                                                {item.children && item.children.map((item, index) => 
                                                    <ul className='text-center' key={index}>
                                                        <li>
                                                            <NavLink 
                                                                className={(nav) => cx('sub-nav-header', { active: nav.isActive })} 
                                                                to={item.to}
                                                            >
                                                                {item.title}
                                                            </NavLink>
                                                            <ul className='mt-3'>
                                                                {item.children && item.children.map((item, index) => (
                                                                    <li key={index}>
                                                                        <Button className={cx('sub-nav-item')} to={item.to}>{item.title}</Button>
                                                                    </li>
                                                                ))}
                                                            </ul>    
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                            <div className={cx('sub-nav-item-with-image')}>
                                                {(item.title === 'Thực đơn') &&
                                                    <div className={cx('banner-menu')}>
                                                        <div className={cx('txt')}>
                                                            <Button className={cx('sub-nav-header')} to={item.to}>Phin Sữa Đá Đậm Đà Chất Phin! 29.000đ</Button>
                                                        </div>
                                                        <div className={cx('img')}>
                                                            <Button to={item.to}>
                                                                <img src={images.nav_menu_image} alt='Phin sua da' />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                                {(item.title === 'Về chúng tôi') &&
                                                    <div className={cx('banner-menu')}>
                                                        <div className={cx('txt')}>
                                                            <Button className={cx('sub-nav-header')} to={item.to}>Thương hiệu bắt nguồn từ cà phê Việt!</Button>
                                                        </div>
                                                        <div className={cx('img')}>
                                                            <Button to={item.to}>
                                                                <img src={images.nav_about_image} alt='Ve chung toi' />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;