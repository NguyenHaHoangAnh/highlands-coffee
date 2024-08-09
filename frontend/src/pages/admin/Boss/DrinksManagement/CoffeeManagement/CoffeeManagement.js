import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../DrinksManagement.module.scss';

import Breadcrumb from '~/components/Breadcrumb';
import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';
import DrinksForm from '~/components/Form/DrinksForm';
import DeleteForm from '~/components/Form/DeleteForm';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { inputHandler } from '~/middlewares/inputHandler';

import * as coffeeService from '~/services/coffeeService';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        to: config.routes.admin_dashboard,
        icon: faHouse,
    },
    {
        title: 'Quản lý thực đơn',
    },
    {
        title: 'Coffee',
    },
];

const HEADER = [
    'STT',
    'Ảnh',
    'Tên',
    'Ngày tạo',
    'Ngày cập nhật',
    'Hành động',
];

const PAGE = 1;
const PER_PAGE = 5;

function CoffeeManagement() {
    // Query
    const [params, setParams] = useSearchParams({ 'page': PAGE });
    const page = Number(params.get('page')) || PAGE;
    // const perPage = Number(params.get('perPage')) || PER_PAGE;

    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [item, setItem] = useState();
    
    // Pagination
    // const [page, setPage] = useState(Number(params.get('page')));
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [pageCount, setPageCount] = useState();

    // Get data
    const fetchData = (page, perPage) => {
        coffeeService
            .getAllItem(page, perPage)
            .then((data) => {
                setData(data.data);
                setPageCount(data.pageCount)
                // console.log('[COFFEE]', data);
            })
            .catch((error) => console.log('[COFFEE]', error));
    }
    
    // Data change when page changed
    useEffect(() => {
        fetchData(page, perPage);
    }, [page, perPage]);

    // Update data when add or edit an item
    const handleUpdateData = () => {
        // setData(callback(data, newData));
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
        setItem();
        setIsDelete(false);
        handleShowModal();
    }

    // Edit item
    const handleEdit = (item) => {
        setItem(item);
        setIsDelete(false);
        handleShowModal();
    }

    // Delete item
    const handleDelete = (item) => {
        setItem(item);
        setIsDelete(true);
        handleShowModal();
    }
    
    return (
        <div>
            <Breadcrumb header='Coffee' data={BREADCRUMB} />
            <Card title='Coffee'>
                <Table header={HEADER}>
                    {data && data.map((item, index) => (
                        <tr key={item._id}>
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
                        <DrinksForm 
                            item={item} 
                            onClose={handleCloseModal} 
                            updateData={handleUpdateData} 
                            service={coffeeService}
                        />
                    ) : (
                        <DeleteForm 
                            item={item}
                            onClose={handleCloseModal}
                            updateData={handleUpdateData}
                            service={coffeeService}
                        />
                    )}
                </Modal>
            }
        </div>
    );
}

export default CoffeeManagement;