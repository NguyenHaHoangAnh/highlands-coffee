import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from './Sidebar.module.scss';

import config from '~/config';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot, faMugHot, faStore, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Sidebar() {
    const [subMenu, setSubMenu] = useState([]);
    const menuRef = useRef();

    // Find all sub menus
    useEffect(() => {
        const menu = menuRef.current;
        const menuItems = menu.childNodes;

        menuItems.forEach((item) => {
            if (item.childNodes.length > 1) {
                const len = item.childNodes.length;
                setSubMenu(subMenu => [...subMenu, item.childNodes[len - 1]]);
            }
        });
    }, []);

    // Show sub menu when click on menu item
    useEffect(() => {
        if (subMenu.length > 0) {
            subMenu.forEach((menu) => {
                const menuItem = menu.previousSibling;
                const subMenuItems = menu.childNodes;

                if (menuItem.classList.contains(cx('active'))) {
                    menuItem.classList.remove(cx('active'));
                }

                for (let i = 0; i < subMenuItems.length; i++) {
                    const item = subMenuItems[i].childNodes[0];
                    if  (item.classList.contains(cx('active'))) {
                        if (!menuItem.classList.contains(cx('active'))) {
                            menuItem.classList.add(cx('active'));
                            break;
                        }
                    }
                }
            });
        }
    });

    const toggleSubMenu = (e) => {
        const item = e.currentTarget.parentElement;
        const subItems = item.childNodes[item.childNodes.length - 1]; // sub menu

        if (!item.classList.contains(cx('show-sub-menu'))) {
            item.classList.add(cx('show-sub-menu'));
            item.style.height = `${item.offsetHeight + subItems.offsetHeight + 4}px`;
        } else {
            item.classList.remove(cx('show-sub-menu'));
            item.style.height = `${item.offsetHeight - subItems.offsetHeight - 4}px`;
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Menu ref={menuRef}>
                <MenuItem className={cx('menu-item')} to={config.routes.admin_dashboard} icon={<FontAwesomeIcon icon={faHouse} />} title='Trang chủ' />
                <MenuItem className={cx('menu-item')} to={config.routes.admin_area_management} icon={<FontAwesomeIcon icon={faLocationDot} />} title='Quản lý khu vực' />
                <MenuItem className={cx('menu-item')} to={config.routes.admin_staff_management} icon={<FontAwesomeIcon icon={faUserGroup} />} title='Quản lý quản lý khu vực' />
                <MenuItem className={cx('menu-item')} to={config.routes.admin_shop_management} icon={<FontAwesomeIcon icon={faStore} />} title='Quản lý quán' />
                <MenuItem className={cx('menu-item')} icon={<FontAwesomeIcon icon={faMugHot} />} title='Quản lý thực đơn' onClick={toggleSubMenu}>
                    <Menu className={cx('sub-menu')}>
                        <MenuItem className={cx('sub-menu-item')} to={config.routes.admin_coffee_management} title='Cà phê' />
                        <MenuItem className={cx('sub-menu-item')} to={config.routes.admin_freeze_management} title='Freeze' />
                        <MenuItem className={cx('sub-menu-item')} to={config.routes.admin_tea_management} title='Trà' />
                    </Menu>
                </MenuItem>
                <MenuItem className={cx('menu-item')} to={config.routes.admin_shop_management} icon={<FontAwesomeIcon icon={faStore} />} title='Quản lý quán' />
            </Menu>
        </div>
    );
}

export default Sidebar;