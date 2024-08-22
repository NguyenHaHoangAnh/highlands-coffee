import { useContext, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import Button from '~/components/Button';
import { CartContext } from '~/components/CartProvider';
import { inputHandler } from '~/middlewares/inputHandler';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const cartContext = useContext(CartContext);
    const orders = cartContext && cartContext?.orders;

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

    return (
        <div className={cx('flex justify-between items-center py-8 px-20', 'wrapper', {
            disable: (!orders.length > 0) || (window.location.pathname === config.routes.customer_order)
        })}>
            <div className='flex items-center'>
                Tổng thanh toán ({quantity} sản phẩm): 
                <span className='ml-2 font-semibold text-[24px] text-[var(--primary)]'>
                    {inputHandler.currency(total)} VNĐ
                </span>
            </div>
            <Button className='p-[9px_12px]' to={config.routes.customer_order} primary>
                Xem giỏ hàng
            </Button>
        </div>
    );
}

export default Cart;