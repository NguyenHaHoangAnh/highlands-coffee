import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './Drink.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

import { CartContext } from '~/components/CartProvider';

const cx = classNames.bind(styles);

function Drink() {
    const location = useLocation();
    const item = location.state;
    const [size,  setSize] = useState(item.small.size);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState(1);
    const sizeRef = useRef();
    const cartContext = useContext(CartContext);

    useEffect(() => {
        if (item && size) {
            switch (size) {
                case 'S':
                    setPrice(item.small.price);
                    break;
                case 'M':
                    setPrice(item.medium.price);
                    break;
                case 'L':
                    setPrice(item.large.price);
                    break;
                default:
                    break;
            }
        }
    }, [size, item]);

    const handleClick = (e, size) => {
        const btns = sizeRef.current.childNodes;
        const btn = e.currentTarget;
        
        btns.forEach(btn => {
            if (btn.classList.contains(cx('active'))) {
                btn.classList.remove(cx('active'));
            }
        });

        if (!btn.classList.contains(cx('active'))) {
            btn.classList.add(cx('active'));
        }
        
        setSize(size);
    }

    const handleSubmit = () => {
        const order = {
            _id: item._id,
            image: item.image,
            name: item.name,
            size,
            price,
            quantity: Number(quantity),
        }
        cartContext.handleAddOrder(order);
        resetForm();
    }

    const resetForm = () => {
        setQuantity(1);
    }

    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className='w-full'>
                <div className='w-8/12'>
                    <div className='w-full'>
                        <h1 className={cx('mb-8 font-bold uppercase', 'title')}>{item.name}</h1>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className={cx('relative', 'image')}>
                                <img className='absolute w-full h-full' src={item.image} alt={item.name} />
                            </div>
                            <div>
                                <div className='flex flex-col justify-between h-full'>
                                    <div>
                                        <p className={cx('description')}>{item.description}</p>
                                        <Button className={cx('mt-8 w-full', 'order-btn')} primary onClick={handleSubmit}>
                                            Đặt mua ngay
                                        </Button>
                                    </div>
                                    <div>
                                        <div className={cx('flex items-center mb-8', 'quantity')}>
                                            Số lượng: 
                                            <Input 
                                                className={cx('ml-2', 'quantity-input')}
                                                type='number'
                                                value={quantity}
                                                min={1}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('flex items-center mb-8', 'size')}>
                                            Size:
                                            <div ref={sizeRef} className='flex ml-2'>
                                                <Button 
                                                    className={cx('size-btn', 'active')} 
                                                    outline 
                                                    onClick={(e) => handleClick(e, item.small.size)}
                                                >
                                                    S
                                                </Button>
                                                <Button 
                                                    className={cx('size-btn')} 
                                                    outline 
                                                    onClick={(e) => handleClick(e, item.medium.size)}
                                                >
                                                    M
                                                </Button>
                                                <Button 
                                                    className={cx('size-btn')} 
                                                    outline 
                                                    onClick={(e) => handleClick(e, item.large.size)}
                                                >
                                                    L
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('mb-8', 'price')}>
                                            Giá: 
                                            <span className='ml-2 font-semibold'>{new Intl.NumberFormat('en-US').format(price)} VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drink;