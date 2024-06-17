import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from './News.module.scss';
import { Link } from "react-router-dom";

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function News() {
    const [itemIndex, setItemIndex] = useState(0);
    const sliderRef = useRef();
    const isLoaded = useRef(false);

    const showNextInfo = () => {
        setItemIndex(index => index + 1);
    }

    useEffect(() => {
        const slider = sliderRef.current;
        if (!isLoaded.current) {
            const clone = slider.childNodes[0].cloneNode(true);
            slider.appendChild(clone);

            isLoaded.current = true
        }
    }, []);
    
    useEffect(() => {
        const slider = sliderRef.current;
        const delay = 3000;
        
        const handleTransition = () => {
            if (itemIndex === 4) {
                slider.style.transition = 'none';
                setItemIndex(0);
            }
        }
        
        slider.addEventListener('transitionend', handleTransition);
        if (itemIndex !== 0 && slider.style.transition === 'none 0s ease 0s') {
            slider.style.transition = 'all 0.3s linear';
        }

        const timerId = setInterval(() => {
            showNextInfo();
        }, delay);

        return () => {
            slider.removeEventListener('transitionend', handleTransition);
            clearInterval(timerId);
        }
    }, [itemIndex]);

    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 w-full'>
                <div className={cx('w-full', 'h-full', 'col',  'address')}>
                    <div className={cx('w-full', 'float-right', 'overflow-hidden', 'address-wrapper')}>
                        <div className={cx('title')}>
                            <h2>Quán mới</h2>
                        </div>
                        <div className={cx('w-full')}>
                            <div 
                                className={cx('w-full', 'flex', 'address-content')} 
                                ref={sliderRef} 
                                style={{
                                    translate: `${-100 * itemIndex}%`,
                                }}
                            >
                                {Array.from({ length: 4 }, (_, index) => (
                                    <div 
                                        className={cx('flex-grow-0', 'flex-shrink-0', 'w-full', 'address-content-wrapper')} 
                                        key={index}
                                    >
                                        <ul>
                                            <li className={cx('mb-4', 'address-content-info', 'address-content-header')}>
                                                <Link to={config.routes.customer_home}>
                                                    Hàm cá mập {index}
                                                </Link>
                                            </li>
                                            <li className={cx('address-content-info')}>
                                                <Link to={config.routes.customer_home}>
                                                    Tầng 3, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                                                </Link>
                                            </li>
                                            <li  className={cx('mt-4', 'address-content-info')}>
                                                <Button className={cx('relative', 'address-content-btn')} to={config.routes.customer_home}>
                                                    Tìm đường
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('w-full', 'h-full', 'col', 'news')}>
                    <div className={cx('w-full', 'news-wrapper')}>
                        <div className={cx('flex', 'justify-between', 'items-center', 'title')}>
                            <h2>Tin mới nhất</h2>
                            <Button className={cx('relative', 'news-link')} to={config.routes.customer_home}>
                                Xem toàn bộ
                            </Button>
                        </div>
                        <div className={cx('w-full', 'news-content')}>
                            <ul className={cx('news-list')}>
                                <li className={cx('flex', 'mb-4','news-item')}>
                                    <div className={cx('mr-6', 'news-image')}>
                                        <img className={cx('w-full', 'h-full', 'image')} src={images.news_0} alt='new' />
                                    </div>
                                    <div className={cx('flex-1', 'news-caption')}>
                                        <div className={cx('news-tend')}>Tết mà! TẶNG VẠN THẺ VÀNG, RƯỚC XE BẠC TỶ</div>
                                        <div className={cx('news-date')}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span className='ml-3'>05/01/2024</span>
                                        </div>
                                    </div>
                                </li>
                                <li className={cx('flex', 'mb-4', 'news-item')}>
                                    <div className={cx('mr-6', 'news-image')}>
                                        <img className={cx('w-full', 'h-full', 'image')} src={images.news_1} alt='new' />
                                    </div>
                                    <div className={cx('flex-1', 'news-caption')}>
                                        <div className={cx('news-tend')}>ĐIỀU KHOẢN SỬ DỤNG ĐỐI VỚI THẺ HIGHLANDS COFFEE</div>
                                        <div className={cx('news-date')}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span className='ml-3'>15/11/2023</span>
                                        </div>
                                    </div>
                                </li>
                                <li className={cx('flex', 'mb-4', 'news-item')}>
                                    <div className={cx('mr-6', 'news-image')}>
                                        <img className={cx('w-full', 'h-full', 'image')} src={images.news_2} alt='new' />
                                    </div>
                                    <div className={cx('flex-1', 'news-caption')}>
                                        <div className={cx('news-tend')}>APP NÀY LÀ CỦA CHÚNG MÌNH</div>
                                        <div className={cx('news-date')}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span className='ml-3'>10/11/2023</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('flex', 'mt-6', 'form')}>
                            <Input className={cx('flex-1', 'form-input')} type='text' placeholder='Nhập thông tin của bạn để nhận thông tin...' />
                            <Button className={cx('form-btn')} leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;