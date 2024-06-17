import classNames from "classnames/bind";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from './Header.module.scss';

import images from '~/assets/images';
import config from '~/config';
import Button from "~/components/Button";
import Input from "~/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { HeaderContext } from "./HeaderContext";

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
        to: '/f',
    },
    {
        title: 'Thẻ',
        to: '/g',
    },
];

function Header() {
    // const headerContext = useContext(HeaderContext);

    // const handleClick = (link) => {
    //     headerContext.handleLink(link);
    // };
    
    return (
        <div className='w-full'>
            <div className={cx('container')}>
                <Link 
                    to={config.routes.customer_home} 
                    // onClick={() => handleClick(config.routes.customer_home)}
                >
                    <img className={cx('logo')} src={images.white_logo} alt="Logo" />
                </Link>
                <div className='flex flex-1 flex-col items-end justify-between'>
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
                        <Button className={cx('ml-4', 'login-btn')} secondary to={config.routes.admin_login}>Đăng nhập</Button>
                    </div>

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