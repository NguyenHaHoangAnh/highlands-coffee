import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './OrderPending.module.scss';

import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { inputHandler } from '~/middlewares/inputHandler'
import { toast } from 'react-toastify';

import * as orderService from '~/services/orderService';

const cx = classNames.bind(styles);

const HEADER = [
    'STT',
    'Mã đơn',
    'Sản phẩm',
    'Trạng thái',
    'Giá tiền',
    'Thanh toán',
    'Người nhận',
    'Địa chỉ',
    'Số điện thoại',
    'Ngày tạo',
    'Hành động',
];

const PAGE = 1;
const PER_PAGE = 5;

function OrderPending() {
    // Query
    const [params, setParams] = useSearchParams({ 'page': PAGE });
    const page = Number(params.get('page')) || PAGE;

    const [data, setData] = useState();

    const [perPage, setPerPage] = useState(PER_PAGE);
    const [pageCount, setPageCount] = useState();
    
    // Get data
    const fetchData = (page, perPage) => {
        orderService
            .getPendingItem(page, perPage)
            .then(data => {
                setData(data.data);
                setPageCount(data.pageCount);
            });
    }

    useEffect(() => {
        fetchData(page, perPage);
    }, [page, perPage]);

    // Accept item 
    const handleAccept = (item) => {
        orderService
            .updateItem(
                item._id,
                item.product,
                item.user,
                item.payment,
                item.status = 'success'
            )
            .then((data) => {
                if (data?.message) {
                    toast.success(data.message);
                    fetchData(page, perPage);
                } else {
                    toast.error(data.error);
                }
            });
    }

    // Cancel item
    const handleCancel = (item) => {
        orderService
            .updateItem(
                item._id,
                item.product,
                item.user,
                item.payment,
                item.status = 'cancel'
            )
            .then((data) => {
                if (data?.message) {
                    toast.success(data.message);
                    fetchData(page, perPage);
                } else {
                    toast.error(data.error);
                }
            });
    }

    return (
        <Card title='Đơn hàng đang xử lý'>
            <Table header={HEADER} fixedLast>
                {data && data.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.product.map((product, index) => (<div key={index}>{product.quantity} x {product.name}</div>))}</td>
                        <td>
                            <span className={cx('py-4', 'status', `status--${item.status}`)}>
                                {new Map([
                                    ['pending', 'Đang xử lý'],
                                    ['success', 'Hoàn thành'],
                                    ['cancel', 'Hủy'],
                                ]).get(item.status)}
                            </span>
                        </td>
                        <td>{inputHandler.currency(item.payment.price)} VNĐ</td>
                        <td>
                            {new Map([
                                ['cash', 'Tiền mặt'],
                                ['transfer', 'Chuyển khoản'],
                            ]).get(item.payment.type)}
                        </td>
                        <td>{item.user.name}</td>
                        <td>{item.user.address}</td>
                        <td>{item.user.phone_number}</td>
                        <td>{inputHandler.date(item.created_at)}</td>
                        <td>
                            <Button 
                                className={cx('action-btn')} 
                                primary
                                onClick={() => handleAccept(item)}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            <Button 
                                className={cx('action-btn')} 
                                primary
                                onClick={() => handleCancel(item)}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Pagination 
                pageCount={pageCount} 
                page={page} 
                params={params}
                setParams={setParams}
            />
        </Card>
    );
}

export default OrderPending;