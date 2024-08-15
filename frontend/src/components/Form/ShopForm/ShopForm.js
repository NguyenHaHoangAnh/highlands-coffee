import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from './ShopForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";
import { toast } from 'react-toastify';
import { inputHandler } from '~/middlewares/inputHandler';
import { AuthUserContext } from '~/components/AuthUserProvider';

import * as areaService from '~/services/areaService';
import * as shopService from '~/services/shopService';

const cx = classNames.bind(styles);

function ShopForm({ item, onClose = () => {}, updateData = () => {} }) {
    const context = useContext(AuthUserContext);
    const user = context && context?.user;
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        area: item !== undefined ? item.area?._id : ((user && user.role === 'area_manager') ? user.work_place._id : ''),
        address: item !== undefined ? item.address : '',
        phone_number: item !== undefined ? item.phone_number : '',
    });
    const [area, setArea] = useState();

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
            })
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    
    const handleSubmit = () => {
        console.log('[shop form]', inputs);
        if (item === undefined) {
            // Create
            shopService
                .createItem(
                    inputs.name, 
                    inputs.area, 
                    inputs.address, 
                    inputs.phone_number, 
                )
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
                });
        } else {
            // Update
            shopService
                .updateItem(
                    item._id,
                    inputs.name, 
                    inputs.area, 
                    inputs.address, 
                    inputs.phone_number, 
                )
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
                });
        }
        onClose();
    }
    
    return (
        <CustomForm 
            title='Thông tin quản lý quán' 
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin cơ bản</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Tên quán'
                label='Tên'
                inline
                name='name'
                value={inputs.name}
                onChange={(e) => handleInputChange(e.target)}
            />
            <Select 
                className={cx('form-input')}
                data={area}
                name='area'
                value={inputs.area}
                defaultValue={item?.area?.data?.name || 'Chọn khu vực'}
                label='Khu vực'
                inline
                optionLabel='name'
                optionValue='_id'
                readOnly={user && (user.role === 'area_manager')}
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

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
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

export default ShopForm;