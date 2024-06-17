import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './AreaManagement.module.scss';

import Breadcrumb from '~/components/Breadcrumb';
import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';
import AreaForm from '~/components/Form/AreaForm';
import DeleteForm from '~/components/Form/DeleteForm';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as freezeService from '~/services/freezeService';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        to: config.routes.admin_dashboard,
        icon: faHouse,
    },
    {
        title: 'Quản lý khu vực',
    },
];

const HEADER = [
    'STT',
    'Tên',
    'Quản lý',
    'Địa chỉ',
    'Số điện thoại',
    'Ngày tạo',
    'Hành động',
];

const DATA = [
    {
        _id: '1',
        name: 'Hà Nội',
        manager: 'Nguyễn Văn A',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
        phone: '0987 6543 21',
        created_at: '2024-01-26T',
    },
    {
        _id: '2',
        name: 'Hồ Chí Minh',
        manager: 'Nguyễn Văn B',
        address: '1 Tôn Thất Thuyết, Bắc Từ Liêm, Hồ Chí Minh',
        phone: '0987 6543 21',
        created_at: '2024-01-26T',
    },
    {
        _id: '3',
        name: 'Đà Nẵng',
        manager: 'Nguyễn Văn C',
        address: '123 Nguyễn Văn Cừ, Bắc Từ Liêm, Đà Nẵng',
        phone: '0987 6543 21',
        created_at: '2024-01-26T',
    },
];

const PAGE = 1;
const PER_PAGE = 5;

function AreaManagement() {
    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [item, setItem] = useState();

    // Pagination
    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [pageCount, setPageCount] = useState();

    const formatDate = (fullDate) => {
        const date = fullDate.split('T').shift();
        return date.split('-').reverse().join('/');
    }
    
    // Get data
    const getData = () => {
        // freezeService
        //     .getAllItem()
        //     .then(data => setData(data));
        setData(DATA);
    }

    useEffect(() => {
        getData();
    }, []);

    // Update data when create or edit an item
    const updateData = (newData) => {
        setData(data => [...data, newData]);
        getData();
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
            <Breadcrumb header='Quản lý khu vực' data={BREADCRUMB} />
            <Card title='Khu vực'>
                <Table header={HEADER}>
                    {data && data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.manager}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{formatDate(item.created_at)}</td>
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
                    pageCount={10} 
                    page={page} 
                    setPage={setPage}
                />
                <Button 
                    className={cx('mt-8', 'submit-btn')} 
                    primary 
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleAdd}
                >
                    Thêm
                </Button>
            </Card>

            {showModal &&
                <Modal className={cx('modal', { delete: isDelete })}>
                    {!isDelete ? (
                        <AreaForm 
                            item={item} 
                            onClose={handleCloseModal} 
                            updateData={updateData}
                        />
                    ) : (
                        <DeleteForm 
                            item={item}
                            onClose={handleCloseModal}
                            updateData={updateData}
                            service={''}
                        />
                    )}
                </Modal>
            }
        </div>
    );
}

export default AreaManagement;