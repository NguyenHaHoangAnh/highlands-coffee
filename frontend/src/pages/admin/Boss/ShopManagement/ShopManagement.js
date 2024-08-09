import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ShopManagement.module.scss';

import Breadcrumb from '~/components/Breadcrumb';
import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Select from '~/components/Select';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';
import ShopForm from '~/components/Form/ShopForm';
import DeleteForm from '~/components/Form/DeleteForm';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { inputHandler } from '~/middlewares/inputHandler'

import * as shopService from '~/services/shopService';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        to: config.routes.admin_dashboard,
        icon: faHouse,
    },
    {
        title: 'Quản lý quán',
    },
];

const HEADER = [
    'STT',
    'Tên',
    'Khu vực',
    'Quản lý',
    'Địa chỉ',
    'Số điện thoại',
    'Ngày tạo',
    'Ngày cập nhật',
    'Hành động',
];

// const AREAS = [
//     {
//         id: '1',
//         name: 'Hà Nội',
//         manager: 'Nguyễn Văn A',
//         created_at: '2024-01-26T',
//     },
//     {
//         id: '2',
//         name: 'Hồ Chí Minh',
//         manager: 'Nguyễn Văn B',
//         created_at: '2024-01-26T',
//     },
//     {
//         id: '3',
//         name: 'Đà Nẵng',
//         manager: 'Nguyễn Văn C',
//         created_at: '2024-01-26T',
//     },
// ];

const PAGE = 1;
const PER_PAGE = 5;

function ShopManagement() {
    // Query
    const [params, setParams] = useSearchParams({ 'page': PAGE });
    const page = Number(params.get('page')) || PAGE;

    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [item, setItem] = useState();

    const [perPage, setPerPage] = useState(PER_PAGE);
    const [pageCount, setPageCount] = useState();
    
    // Get data
    const fetchData = (page, perPage) => {
        shopService
            .getAllItem(page, perPage)
            .then(data => {
                setData(data.data);
                setPageCount(data.pageCount);
            });
    }

    useEffect(() => {
        fetchData(page, perPage);
    }, [page, perPage]);

    // Update data when create or edit an item
    const updateData = () => {
        fetchData(page, perPage);
    }
    
    // Show modal
    const handleShowModal = () => {
        setShowModal(true);
    }
    
    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // Add item
    const handleAdd = () => {
        handleShowModal();
        setItem();
        setIsDelete(false);
    }

    // Edit item
    const handleEdit = (item) => {
        handleShowModal();
        setItem(item);
        setIsDelete(false);
    }

    // Delete item
    const handleDelete = (item) => {
        handleShowModal();
        setItem(item);
        setIsDelete(true);
    }
    
    return (
        <div>
            <Breadcrumb header='Quản lý quán' data={BREADCRUMB} />
            <Card title='Quán'>
                {/* <Select data={AREAS} defaultValue='Chọn khu vực' /> */}
                <Table header={HEADER}>
                    {data && data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.area?.data?.name}</td>
                            <td>{item.shop_manager?.data?.name}</td>
                            <td>{item.address}</td>
                            <td>{item.phone_number}</td>
                            <td>{inputHandler.date(item.created_at)}</td>
                            <td>{inputHandler.date(item.updated_at)}</td>
                            <td>
                                <Button 
                                    className={cx('action-btn')} 
                                    primary
                                    onClick={() => handleEdit(item)}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
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
                <Pagination 
                    pageCount={pageCount} 
                    page={page} 
                    params={params}
                    setParams={setParams}
                />
                <Button 
                    className={cx('mt-8', 'submit-btn')} 
                    primary leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleAdd}
                >
                    Thêm
                </Button>
            </Card>

            {showModal &&
                <Modal className={cx('modal', { delete: isDelete })}>
                    {!isDelete ? (
                        <ShopForm 
                            item={item} 
                            onClose={handleCloseModal} 
                            updateData={updateData}
                        />
                    ) : (
                        <DeleteForm 
                            item={item}
                            onClose={handleCloseModal}
                            updateData={updateData}
                        />
                    )}
                </Modal>
            }
        </div>
    );
}

export default ShopManagement;