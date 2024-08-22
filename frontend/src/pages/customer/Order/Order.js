import { useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import Table from '~/components/Table';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OrderForm from '~/components/Form/OrderForm';
import { CartContext } from '~/components/CartProvider';
import { inputHandler } from '~/middlewares/inputHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const HEADER = [
    'STT',
    'Ảnh',
    'Tên',
    'Kích cỡ',
    'Giá',
    'Số lượng',
    'Hành động',
];

function Order() {
    const cartContext = useContext(CartContext);
    const orders = cartContext && cartContext?.orders;
    const [showModal, setShowModal] = useState(false);

    const handleAdd = (item) => {
        const order = {
            _id: item._id,
            image: item.image,
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: 1,
        }
        cartContext.handleAddOrder(order);
    }

    const handleRemove = (item) => {
        const order = {
            _id: item._id,
            name: item.name,
            size: item.size,
            quantity: 1,
        }
        cartContext.handleRemoveOrder(order);
    }

    const handleDelete = (item) => {
        const order = {
            _id: item._id,
            size: item.size,
        };
        cartContext.handleDeleteOrder(order);
    }
    
    const handleDeleteAll = () => {
        cartContext.handleDeleteAllOrder();
    }
    
    const handleSubmit = () => {
        handleShowModal();
    }

    const total = useMemo(() => {
        if (orders) {
            return orders.reduce((total, order) => (total + order.price * order.quantity), 0);
        } else {
            return 0;
        }
    }, [orders]);

    const quantity = useMemo(() => {
        if (orders) {
            return orders.reduce((total, order) => (total + order.quantity), 0);
        } else {
            return 0;
        }
    }, [orders]);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className='pt-36 pb-20 px-20'>
            <div className={cx('mb-8', 'title')}>
                <h1>Đơn hàng</h1>
            </div>
            <Table header={HEADER} fixedLast>
                {orders && orders.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td 
                            style={{
                                background: `url(${item.image})`,
                                backgroundPosition: 'left center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                mixBlendMode: 'multiply',
                        }}
                        ></td>
                        <td>{item.name}</td>
                        <td>{item.size}</td>
                        <td>{inputHandler.currency(item.price)}</td>
                        <td className='flex items-center'>
                            <Button 
                                className='flex justify-center items-center size-8 rounded-full' 
                                primary
                                onClick={() => handleRemove(item)}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <span className='mx-4'>{item.quantity}</span>
                            <Button 
                                className='flex justify-center items-center size-8 rounded-full' 
                                primary
                                onClick={() => handleAdd(item)}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </td>
                        <td>
                            <Button 
                                className={cx('action-btn')} 
                                primary
                                onClick={() => handleDelete(item)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </Table>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    Tổng thanh toán ({quantity} sản phẩm): 
                    <span className='ml-2 font-semibold text-[24px] text-[var(--primary)]'>
                        {inputHandler.currency(total)} VNĐ
                    </span>
                </div>
                <div>
                    <Button 
                        className='mr-4 p-[9px_60px] hover:bg-transparent hover:text-[var(--primary)]' 
                        outline
                        disable={orders.length <= 0}
                        onClick={handleDeleteAll}
                    >
                        Xóa tất cả
                    </Button>
                    <Button 
                        className='p-[9px_60px]' 
                        primary
                        disable={orders.length <= 0}
                        onClick={handleSubmit}
                    >
                        Mua hàng
                    </Button>
                </div>
            </div>

            {showModal &&
                <Modal>
                    <OrderForm 
                        onClose={handleCloseModal}
                    />
                </Modal>
            }
        </div>
    );
}

export default Order;