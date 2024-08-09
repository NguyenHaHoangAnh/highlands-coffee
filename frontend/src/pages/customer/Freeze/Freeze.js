import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from './Freeze.module.scss';

import Button from '~/components/Button';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { slugHandler } from "~/middlewares/slugHandler";

import * as freezeService from '~/services/freezeService';

const cx = classNames.bind(styles);

function Freeze() {
    const [data, setData] = useState();
    const swiperRef = useRef();

    useEffect(() => {
        freezeService
            .getAllItem()
            .then(data => setData(data.data));
    }, []);
    
    return (
        <div className='w-full pt-36 pb-20'>
            <div className='w-full px-20'>
                <div className='w-8/12'>
                    <div className={cx('box')}>
                        <div className={cx('mb-8', 'box-title')}>
                            <h1>Freeze</h1>
                        </div>
                        <div className={cx('box-content')}>
                            <div className={cx('description')}>
                                Sảng khoái với thức uống đá xay phong cách Việt. 
                                Freeze là thức uống đá xay mát lạnh được pha chế từ những nguyên liệu thuần túy của Việt Nam.
                            </div>
                            <div className='flex justify-end'>
                                <Button className={cx('control-btn')} onClick={() => swiperRef.current.slidePrev()}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </Button>
                                <Button className={cx('control-btn')} onClick={() => swiperRef.current.slideNext()}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Button>
                            </div>
                            {data && 
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {data.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <li>
                                                <div className={cx('mb-8', 'img')}>
                                                    <Link 
                                                        className={cx('flex justify-center items-center w-full')}
                                                        to={slugHandler.getSlug(item.name)}
                                                        state={item}
                                                    >
                                                        <img src={item.image} alt={item.name} />
                                                    </Link>
                                                </div>
                                                <div className={cx('mb-4 text-center', 'tend')}>
                                                    <Link 
                                                        to={slugHandler.getSlug(item.name)}
                                                        state={item}
                                                    >
                                                        <h3>{item.name}</h3>
                                                    </Link>
                                                </div>
                                                <div className={cx('text-center', 'price')}>
                                                    Giá: 
                                                    <strong className='ml-2'>
                                                        {new Intl.NumberFormat('en-US').format(item.small.price)} VNĐ
                                                    </strong>
                                                </div>
                                            </li>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Freeze;