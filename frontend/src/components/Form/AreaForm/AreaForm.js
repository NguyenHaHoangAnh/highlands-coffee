import classNames from "classnames/bind";
import { useState } from "react";
import styles from './AreaForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";

import * as areaService from '~/services/freezeService';

const cx = classNames.bind(styles);

function AreaForm({ item, onClose = () => {}, updateData = () => {} }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        address: item !== undefined ? item.address : '',
        phone: item !== undefined ? item.phone : '',
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
                label='Đại chỉ'
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
                name='phone'
                value={inputs.phone}
                onChange={(e) => {
                    let { name, value } = e.target;
                    value =  value.replace(/[^0-9\s]/g, '');
                    if (value.length === 4 || value.length === 9) 
                        value += ' ';
                    
                    if (value.length < 13) {
                        setInputs((prev) => ({
                            ...prev,
                            [name]: value,
                        }));
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        // Prevent press space key
                        e.preventDefault();
                    } else if (e.key === 'Backspace') {
                        // Handle delete
                        if (inputs.phone[inputs.phone.length - 1] === ' ') {
                            setInputs((prev) => ({
                                ...prev,
                                phone: inputs.phone.slice(0, -1),
                            }))
                        }
                    }
                }}
            />
        </CustomForm>
    );
}

export default AreaForm;