import { createContext, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderResearch.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { toast } from 'react-toastify';
import { inputHandler } from '~/middlewares/inputHandler';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as orderService from '~/services/orderService';
import { faArrowLeft, faArrowRightRotate, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const OrderContext = createContext();

function OrderResearch() {
    const [children, setChildren] = useState(<ResearchInput />);
    const [id, setId] = useState();
    const [result, setResult] = useState();

    const handleSetId = (phone_number) => {
        setId(phone_number);
    }
    
    const handleSetResult = (result) => {
        setResult(result);
    }

    const handleSetChildren = (children) => {
        setChildren(children);
    }
    
    const value = {
        id,
        result,
        handleSetId,
        handleSetResult,
        handleSetChildren,
    }

    useEffect(() => {
        if (result) {
            setChildren(<ResearchResult />);
        }
    }, [result]);

    return (
        <div className='pt-36 pb-20 px-20'>
            <div className='w-4/5'>
                <div className={cx('mb-12', 'title')}>
                    <h1>Tra cứu đơn hàng</h1>
                </div>
                <OrderContext.Provider value={value}>
                    {children}
                </OrderContext.Provider>
            </div>
        </div>
    );
}

function ResearchInput() {
    const orderContext = useContext(OrderContext);
    const orderId = orderContext && orderContext?.id;
    const [id, setId] = useState(orderId || '');

    const handleSearch = () => {
        if (id !== '') {
            orderContext.handleSetId(id);
            // API get orders
            orderService
                .getItemById(id)
                .then((data) => {
                    if (data?.message) {
                        // console.log('[data]', data?.data);
                        orderContext.handleSetResult(data?.data);
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
                });
        }
    }

    const handleReset = () => {
        setId('');
    }

    return (
        <div className='w-full min-h-[180px]'>
            <Input 
                className='w-3/5 border border-solid border-[var(--border-color)]'
                type='text'
                placeholder='Nhập mã đơn hàng...'
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <div className='flex mt-8 w-full'>
                <Button
                    className='p-[9px_40px]'
                    primary
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon className='mr-4' icon={faMagnifyingGlass} />
                    Tìm kiếm
                </Button>
                <Button
                    className='ml-4 p-[9px_40px] hover:text-[var(--primary)] hover:bg-white'
                    outline
                    onClick={handleReset}
                >
                    <FontAwesomeIcon className='mr-4' icon={faArrowRightRotate} />
                    Nhập lại
                </Button>
            </div>
        </div>
    )
}

function ResearchResult() {
    const orderContext = useContext(OrderContext);
    const result = orderContext && orderContext?.result;
    
    const onBack = () => {
        orderContext.handleSetChildren(<ResearchInput />);
        orderContext.handleSetResult();
    }

    return (
        <div>
            {result && 
                <div className='grid grid-cols-2'>
                    <div>
                        <h3 className={cx('font-semibold uppercase mb-4', 'result-header')}>Thông tin đơn hàng</h3>
                        <div className='grid grid-cols-[100px_auto] mb-4'>
                            <p>Sản phẩm:</p>
                            <ul>
                                {result.product.map((item, index) => (
                                    <li className='font-semibold' key={index}>{item.quantity} x {item.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='grid grid-cols-[100px_auto] mb-4'>
                            <p>Trạng thái:</p>
                            <div className={cx('status', `status--${result.status}`)}>
                                {new Map([
                                    ['pending', 'Đang xử lý'],
                                    ['success', 'Hoàn thành'],
                                    ['cancel', 'Hủy'],
                                ]).get(result.status)}
                            </div>
                        </div>
                        <div className='grid grid-cols-[100px_auto] mb-4'>
                            <p>Quán:</p>
                            <p className='font-semibold'>{result.user.shop.name}</p>
                        </div>
                        <div className='grid grid-cols-[100px_auto] mb-4'>
                            <p>Giá tiền:</p>
                            <p className='font-semibold'>{inputHandler.currency(result.payment.price)} VNĐ</p>
                        </div>
                        <div className='grid grid-cols-[100px_auto] mb-4'>
                            <p>Thanh toán:</p>
                            <p className='font-semibold'>{new Map([
                                ['cash', 'Tiền mặt'],
                                ['transfer', 'Chuyển khoản'],
                            ]).get(result.payment.type)}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={cx('font-semibold uppercase mb-4', 'result-header')}>Thông tin người nhận</h3>
                        <div className='grid grid-cols-[80px_auto] mb-4'>
                            <p>Tên:</p>
                            <p className='font-semibold'>{result.user.name}</p>
                        </div>
                        <div className='grid grid-cols-[80px_auto] mb-4'>
                            <p>Địa chỉ:</p>
                            <p className='font-semibold'>{result.user.address}, {result.user.area.name}</p>
                        </div>
                        <div className='grid grid-cols-[80px_auto] mb-4'>
                            <p>SĐT:</p>
                            <p className='font-semibold'>{result.user.phone_number}</p>
                        </div>
                    </div>
                </div>
            }
            <Button 
                className='mt-8 hover:text-[var(--primary)]'
                onClick={onBack}
            >
                <FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
                Quay lại
            </Button>
        </div>
    )
}

export default OrderResearch;