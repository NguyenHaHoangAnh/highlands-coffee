import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './StaffManagement.module.scss';

import Breadcrumb from '~/components/Breadcrumb';
import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import StaffForm from '~/components/Form/StaffForm';
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
        title: 'Quản lý quản lý khu vực',
    },
];

const HEADER = [
    'STT',
    'Tên',
    'Ngày sinh',
    'Giới tính',
    'Khu vực',
    'Số điện thoại',
    'Ngày tham gia',
    'Hành động',
];

const DATA = [
    {
        _id: '1',
        name: 'Nguyễn Văn A',
        birthday: '06/04/2003',
        gender: 'Nam',
        role: 'area_manager',
        work_place: 'Hà Nội',
        phone: '0987 6543 21',
        email: 'a@gmail.com',
        password: '123',
        created_at: '2024-01-26T',
    },
    {
        _id: '2',
        name: 'Nguyễn Văn B',
        birthday: '14/08/2003',
        gender: 'Nữ',
        role: 'area_manager',
        work_place: 'Hồ Chí Minh',
        phone: '0987 6543 21',
        email: 'a@gmail.com',
        password: '123',
        created_at: '2024-01-26T',
    },
    {
        _id: '3',
        name: 'Nguyễn Văn C',
        birthday: '30/03/2003',
        gender: 'Nam',
        role: 'area_manager',
        work_place: 'Đà Nẵng',
        phone: '0987 6543 21',
        email: 'a@gmail.com',
        password: '123',
        created_at: '2024-01-26T',
    },
];

function StaffManagement() {
    const [data, setData] = useState();
    const [showModal,  setShowModal] = useState(false);
    const [isDelete,  setIsDelete] = useState(false);
    const [item, setItem] = useState();

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
        setIsDelete(false)
    }

    // Delete item
    const handleDelete = (item) => {
        handleShowModal();
        setItem(item);
        setIsDelete(true);
    }

    return (
        <div>
            <Breadcrumb header='Quản lý quản lý khu vực' data={BREADCRUMB} />
            <Card title='Quản lý'>
                <Table header={HEADER}>
                    {data && data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.birthday}</td>
                            <td>{item.gender}</td>
                            <td>{item.work_place}</td>
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
                    <StaffForm 
                        item={item} 
                        role='area_manager' 
                        onClose={handleCloseModal} 
                        updateData={updateData}
                        service={''}
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

export default StaffManagement;