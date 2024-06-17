import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Slider.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Slider({ data, rows }) {
    const [itemIndex, setItemIndex] = useState(rows);
    const [isRight, setIsRight] = useState(false);
    const sliderRef = useRef();
    const isLoaded = useRef(false);

    const showNextImage = () => {
        setItemIndex(index => index + 1);
        setIsRight(true);
    }

    const showPrevImage = () => {
        setItemIndex(index => index - 1);
        setIsRight(false);
    }

    useEffect(() => {
        if (data) {
            const slider = sliderRef.current;
            const len = slider.childNodes.length;

            if (!isLoaded.current) {
                for (let i = 0; i < rows; i++) {
                    const clone = slider.childNodes[i].cloneNode(true);
                    slider.appendChild(clone);
                }

                let increase = 0;
                for (let i = len - 1; i > len - 1 - rows; i--) {
                    const clone = slider.childNodes[i + increase].cloneNode(true);
                    slider.insertBefore(clone, slider.childNodes[0]);
                    increase++;
                }

                isLoaded.current = true;
            }
        }
    }, [data, rows]);

    useEffect(() => {
        const slider = sliderRef.current;
        const initIndex = rows;

        const handleTransition = () => {
            if (data) {
                if (itemIndex === initIndex + data.length) {
                    slider.style.transition = 'none';
                    setItemIndex(initIndex);
                } else if (itemIndex === initIndex - rows) {
                    slider.style.transition = 'none';
                    setItemIndex(initIndex + data.length - rows);
                } 
            }
        }
        
        slider.addEventListener('transitionend', handleTransition);
        if (data) {
            if (itemIndex !== initIndex && 
                isRight &&
                slider.style.transition === 'none 0s ease 0s'
            ) {
                slider.style.transition = 'all 0.3s linear';
            } else if (itemIndex !== initIndex + data.length - rows && 
                !isRight &&
                slider.style.transition === 'none 0s ease 0s'
            ) {
                slider.style.transition = 'all 0.3s linear';
            }
        }

        // console.log(itemIndex);

        const timerId = setInterval(() => {
            showNextImage();
        }, 3000);

        return () => {
            slider.removeEventListener('transitionend', handleTransition);
            clearInterval(timerId);
        }
    }, [data, rows, isRight, itemIndex]);

    // Loại bỏ dấu trong Tiếng Việt
    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    return (
        <div className='w-full'>
            <div className='flex flex-col overflow-hidden'>
                <div className='flex justify-end'>
                    <Button className={cx('control-btn')} onClick={showPrevImage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    <Button className={cx('control-btn')} onClick={showNextImage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>
                <ul 
                    className={cx('flex', 'drinks-list')}
                    ref={sliderRef}
                    style={{
                        translate: `${-(100 / rows) * itemIndex}%`,
                    }}
                >
                    {data &&
                        data.map((item, index) => (
                            <li 
                                className={cx('flex', 'flex-col', 'drinks-item')} 
                                key={index}
                                style={{
                                    width: `calc(${100 / rows}% - 30px)`,
                                }}
                            >
                                <div className={cx('mb-8', 'img')}>
                                    <Link 
                                        to={`/${removeAccents(item.name.toLowerCase()).replaceAll(' ', '-')}`}
                                        state={item}
                                    >
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                </div>
                                <div className={cx('mb-4', 'text-center', 'tend')}>
                                    <Link 
                                        to={`/${removeAccents(item.name.toLowerCase()).replaceAll(' ', '-')}`}
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
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Slider;