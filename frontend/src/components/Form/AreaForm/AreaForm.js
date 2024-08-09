import classNames from "classnames/bind";
import { useState } from "react";
import styles from './AreaForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";
import { inputHandler } from '~/middlewares/inputHandler';

import * as areaService from '~/services/areaService';

const cx = classNames.bind(styles);

function AreaForm({ item, onClose = () => {}, updateData = () => {} }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        address: item !== undefined ? item.address : '',
        phone_number: item !== undefined ? item.phone_number : '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        if (item === undefined) {
            // console.log(inputs);
            // Create
            // areaService
            //     .createItem(
            //         inputs.name, 
            //     )
            //     .then((data) => {
            //         updateData(data);
            //     })
        } else {
            // Update
        }
        onClose();
    }
    
    return (
        <CustomForm 
            title='Thông tin khu vực' 
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin cơ bản</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Tên khu vực'
                label='Tên'
                inline
                name='name'
                value={inputs.name}
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
                onChange={handleInputChange}
            />
            
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên hệ</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Số điện thoại'
                label='SĐT'
                inline
                name='phone_number'
                maxLength={12}
                value={inputHandler.phone(inputs.phone_number)}
                onChange={handleInputChange}
            />
        </CustomForm>
    );
}

export default AreaForm;