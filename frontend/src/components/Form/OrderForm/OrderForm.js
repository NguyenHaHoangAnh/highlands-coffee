import classNames from "classnames/bind";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import styles from './OrderForm.module.scss';

import Input from '~/components/Input';
import Select from '~/components/Select';
import Button from '~/components/Button';
import CustomForm from "../CustomForm";
import images from '~/assets/images';
import { CartContext } from '~/components/CartProvider';
import { inputHandler } from '~/middlewares/inputHandler';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

import * as areaService from '~/services/areaService';
import * as shopService from '~/services/shopService';
import * as orderService from '~/services/orderService';

const OrderContext = createContext();

const cx = classNames.bind(styles);

function OrderForm({ onClose = () => {} }) {
    const [children, setChildren] = useState(<InfoForm onClose={onClose} />);
    const cartContext = useContext(CartContext);
    const orders = cartContext && cartContext?.orders;
    const [order, setOrder] = useState({
        product: orders || [],
        user: {},
        payment: {},
        status: 'pending',
    });
    const [finishPayment, setFinishPayment] = useState(false);
    
    const handleSetUser = (user) => {
        setOrder((prev) => ({
            ...prev,
            user,
        }));
    }

    const handleSetPayment = (payment) => {
        setOrder((prev) => ({
            ...prev,
            payment,
        }));
    }
    
    const total = useMemo(() => {
        if (orders) {
            return orders.reduce((total, order) => (total + order.price * order.quantity), 0);
        } else {
            return 0;
        }
    }, [orders]);

    const handleSetChildren = (children) => {
        setChildren(children);
    }

    const handleSetFinishPayment = (finishPayment) => {
        setFinishPayment(finishPayment);
    }

    const value = {
        order,
        total,
        handleSetUser,
        handleSetPayment,
        handleSetChildren,
        handleSetFinishPayment,
    }

    useEffect(() => {
        if (finishPayment) {
            // console.log('[order]', order);
            // API create order
            orderService
                .createItem(
                    order.product,
                    order.user,
                    order.payment,
                    order.status
                )
                .then((data) => {
                    if (data?.message) {
                        toast.success(data?.message);
                        // Remove orders from cart
                        cartContext.handleDeleteAllOrder();
                    } else {
                        toast.error(data?.error);
                    }
                });
            onClose();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishPayment]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

function InfoForm({ onClose = () => {} }) {
    const orderContext = useContext(OrderContext);
    const order = orderContext && orderContext?.order;
    const [inputs, setInputs] = useState({
        name: order?.user?.name || '',
        area: order?.user?.area || 'Chọn khu vực',
        shop: order?.user?.shop || 'Chọn quán',
        address: order?.user?.address || '',
        phone_number: order?.user?.phone_number || '',
    });
    const [area, setArea] = useState();
    const [shop, setShop] = useState();

    const handleInputChange = (target) => {
        const { name, value } = target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const fetchData = () => {
        areaService
            .getAllItem()
            .then((data) => {
                setArea(data.data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (inputs.area !== 'Chọn khu vực') {
            setInputs((prev) => ({
                ...prev,
                shop: 'Chọn quán',
            }));
            shopService
                .getItemByArea(inputs.area)
                .then((data) => {
                    setShop(data.data);
                });
        }
    }, [inputs.area]);
    
    const handleSubmit = () => {
        orderContext.handleSetUser(inputs);
        orderContext.handleSetChildren(<PaymentForm onClose={onClose} />)
    }
    
    return (
        <CustomForm 
            title='Thông tin người nhận' 
            submitLabel='Tiến hành thanh toán'
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin cơ bản</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Tên'
                label='Tên'
                inline
                name='name'
                value={inputs.name}
                onChange={(e) => handleInputChange(e.target)}
            />

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
            <Select 
                className={cx('form-input')}
                data={area}
                name='area'
                value={inputs.area}
                defaultValue='Chọn khu vực'
                label='Khu vực'
                inline
                optionLabel='name'
                optionValue='_id'
                onChange={handleInputChange}
            />
            <Select 
                className={cx('form-input')}
                data={shop}
                name='shop'
                value={inputs.shop}
                defaultValue='Chọn quán'
                label='Quán'
                inline
                optionLabel='name'
                optionValue='_id'
                onChange={handleInputChange}
            />
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Địa chỉ'
                label='Địa chỉ'
                inline
                name='address'
                value={inputs.address}
                onChange={(e) => handleInputChange(e.target)}
            />
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Số điện thoại'
                label='SĐT'
                inline
                name='phone_number'
                value={inputHandler.phone(inputs.phone_number)}
                maxLength={12}
                onChange={(e) => handleInputChange(e.target)}
            />
        </CustomForm>
    );
}

function PaymentForm({ onClose = () => {} }) {
    const orderContext = useContext(OrderContext);
    const total = orderContext && orderContext?.total;
    const [inputs, setInputs] = useState({
        type: 'cash',
        price: total,
    });

    const handleInputChange = (target) => {
        const { name, value } = target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const onBack = () => {
        orderContext.handleSetChildren(<InfoForm onClose={onClose} />)
    }
    
    const handleSubmit = () => {
        orderContext.handleSetPayment(inputs);
        orderContext.handleSetFinishPayment(true);
    }
    
    return (
        <CustomForm 
            className='relative'
            title='Thông tin thanh toán' 
            submitLabel='Hoàn tất'
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <Button className={cx('absolute', 'back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Hình thức thanh toán</h3>
            <div className='flex'>
                <Input
                    className={cx('flex items-center', 'form-radio')}
                    wrapperClass='mr-32'
                    type='radio'
                    label='Tiền mặt'
                    inline
                    name='type'
                    value='cash'
                    checked={'cash' === inputs.type}
                    onChange={(e) => handleInputChange(e.target)}
                />
                <Input
                    className={cx('flex items-center', 'form-radio')}
                    type='radio'
                    label='Chuyển khoản'
                    inline
                    big
                    name='type'
                    value='transfer'
                    checked={'transfer' === inputs.type}
                    onChange={(e) => handleInputChange(e.target)}
                />
            </div>
            {(inputs.type === 'cash') ? (
                <div className='flex items-center mb-[16px]'>
                    <p>Số tiền</p>
                    <p className='ml-4 font-semibold text-[18px]'>{inputHandler.currency(total)} VNĐ</p>
                </div>
            ) : (
                <div className='grid grid-cols-[30%_auto] gap-8'>
                    <div>
                        <p className='text-[14px]'>Quét mã thanh toán</p>
                        <img className='aspect-square' src={images.qr} alt='qr' />
                    </div>
                    <div>
                        <div className='mb-[16px]'>
                            <p className='text-[14px]'>Ngân hàng</p>
                            <p className='font-semibold text-[18px]'>Ngân hàng BIDV - Chi nhánh Cầu Giấy</p>
                        </div>
                        <div className='mb-[16px]'>
                            <p className='text-[14px]'>Số tài khoản</p>
                            <p className='font-semibold text-[18px]'>21510004273890</p>
                        </div>
                        <div className='mb-[16px]'>
                            <p className='text-[14px]'>Số tiền</p>
                            <p className='font-semibold text-[18px]'>{inputHandler.currency(total)} VNĐ</p>
                        </div>
                    </div>
                </div>
            )}
        </CustomForm>
    );
}

export default OrderForm;