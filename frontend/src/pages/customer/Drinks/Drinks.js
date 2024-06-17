import classNames from "classnames/bind";
import { useContext } from "react";
import styles from './Drinks.module.scss';

import images from '~/assets/images';
import config from '~/config';
import Div from '~/components/Div';
import Button from '~/components/Button';
import { HeaderContext } from "../../../layouts/CustomerLayout/components/Header/HeaderContext";

const cx = classNames.bind(styles);

function Drink() {
    const headerContext = useContext(HeaderContext);

    const handleClick = (link) => {
        headerContext.handleLink(link);
    }

    return (
        <div className='w-full'>
            <div className='w-full'>
                {/* Coffee */}
                <div className={cx('w-full', 'py-20', 'menu')}>
                    <div className={cx('relative', 'menu-wrapper')}>
                        <div className={cx('w-1/2', 'caption')}>
                            <Div className={cx('mb-8', 'tend')}>
                                <h3>
                                    <Button 
                                        to={config.routes.customer_coffee} 
                                        onClick={() => handleClick(config.routes.customer_drinks)}
                                    >
                                        Cà phê
                                    </Button>
                                </h3>
                            </Div>
                            <Div className={cx('mb-16', 'description')}>
                                Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng trên những vùng cao nguyên Việt Nam màu mỡ, 
                                qua những bí quyết rang xay độc đáo, Highlands Coffee chúng tôi tự hào giới thiệu những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
                            </Div>
                            <Div>
                                <Button 
                                    className={cx('btn')} 
                                    outline 
                                    to={config.routes.customer_coffee} 
                                    onClick={() => handleClick(config.routes.customer_drinks)}
                                >
                                    Khám phá thêm
                                </Button>
                            </Div>
                        </div>
                        <Div className={cx('absolute', 'w-1/2', 'img-wrapper')}>
                            <Button 
                                to={config.routes.customer_coffee} 
                                onClick={() => handleClick(config.routes.customer_drinks)}
                            >
                                <img src={images.drinks_coffee} alt='coffee'/>
                            </Button>
                        </Div>
                    </div>
                </div>
                {/* Freeze */}
                <div className={cx('w-full', 'py-20', 'menu')}>
                    <div className={cx('relative', 'menu-wrapper')}>
                        <div className={cx('w-1/2', 'float-right', 'text-right', 'caption')}>
                            <Div className={cx('mb-8', 'tend')}>
                                <h3>
                                    <Button 
                                        to={config.routes.customer_freeze} 
                                        onClick={() => handleClick(config.routes.customer_drinks)}
                                    >
                                        Freeze
                                    </Button>
                                </h3>
                            </Div>
                            <Div className={cx('mb-16', 'description')}>
                                Sảng khoái với thức uống đá xay phong cách Việt. 
                                Freeze là thức uống đá xay mát lạnh được pha chế từ những nguyên liệu thuần túy của Việt Nam.
                            </Div>
                            <Div>
                                <Button 
                                    className={cx('btn')} 
                                    outline 
                                    to={config.routes.customer_freeze} 
                                    onClick={() => handleClick(config.routes.customer_drinks)}
                                >
                                    Khám phá thêm
                                </Button>
                            </Div>
                        </div>
                        <Div className={cx('absolute', 'w-1/2', 'img-wrapper')}>
                            <Button 
                                to={config.routes.customer_freeze} 
                                onClick={() => handleClick(config.routes.customer_drinks)}
                            >
                                <img src={images.drinks_freeze} alt='coffee'/>
                            </Button>
                        </Div>
                    </div>
                </div>
                {/* Tea */}
                <div className={cx('w-full', 'py-20', 'menu')}>
                    <div className={cx('relative', 'menu-wrapper')}>
                        <div className={cx('w-1/2', 'caption')}>
                            <Div className={cx('mb-8', 'tend')}>
                                <h3>
                                    <Button 
                                        to={config.routes.customer_tea} 
                                        onClick={() => handleClick(config.routes.customer_drinks)}
                                    >
                                        Trà
                                    </Button>
                                </h3>
                            </Div>
                            <Div className={cx('mb-16', 'description')}>
                                Hương vị tự nhiên, thơm ngon của Trà Việt 
                                với phong cách hiện đại tại Highlands Coffee sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.
                            </Div>
                            <Div>
                                <Button 
                                    className={cx('btn')} 
                                    outline 
                                    to={config.routes.customer_tea} 
                                    onClick={() => handleClick(config.routes.customer_drinks)}
                                >
                                    Khám phá thêm
                                </Button>
                            </Div>
                        </div>
                        <Div className={cx('absolute', 'w-1/2', 'img-wrapper')}>
                            <Button 
                                to={config.routes.customer_tea} 
                                onClick={() => handleClick(config.routes.customer_drinks)}
                            >
                                <img src={images.drinks_tea} alt='coffee'/>
                            </Button>
                        </Div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drink;