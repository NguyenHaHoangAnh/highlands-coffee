import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Header.module.scss';

import images from '~/assets/images';
import config from '~/config';
import Menu from '~/components/Menu';
import Image from '~/components/Image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'Xem hồ sơ',
        icon: <FontAwesomeIcon icon={faUser} />,
        to: config.routes.admin_profile,
    },
    {
        title: 'Đăng xuất',
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        to: config.routes.customer_home,
        className: 'separate',
    },
];

function Header() {
    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case config.routes.customer_home:
                // Log out
                break;
        
            default:
                break;
        }
    }

    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className='flex justify-between'>
                <div>
                    <Link className='flex items-center' to={config.routes.admin_dashboard}>
                        <img className={cx('logo')} src={images.logo} alt='Logo' />
                        <h1 className={cx('brand')}>Highlands<br/>coffee</h1>
                    </Link>
                </div>
                <div className='flex'>
                    <div className='text-right'>
                        <h3 className={cx('name')}>Nguyễn Hà Hoàng Anh</h3>
                        <p className={cx('role')}>Lãnh đạo</p>
                    </div>
                    <Menu
                        className={cx('menu')}
                        items={MENU_ITEMS}
                        placement='bottom-end'
                        offset={[12, 16]}
                        onChange={handleMenuChange}
                    >
                        <Image 
                            className={cx('avatar')}
                            src=''
                            alt='avatar'
                        />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;