import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ShopForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";

import * as shopService from '~/services/freezeService';

const cx = classNames.bind(styles);

const AREA = [
    {
        id: '1',
        name: 'Hà Nội',
    },
    {
        id: '2',
        name: 'Hồ Chí Minh',
    },
    {
        id: '3',
        name: 'Đà Nẵng',
    },
];

function ShopForm({ item, onClose = () => {}, updateData = () => {} }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        area: item !== undefined ? item.area : '',
        address: item !== undefined ? item.address : '',
        phone: item !== undefined ? item.phone : '',
    });
    const [area, setArea] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        setArea(AREA);
    }, []);
    
    
    const handleSubmit = () => {
        if (item === undefined) {
            // console.log(inputs.birthday);
            // Create
            // shopService
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
                onChange={handleInputChange}
            />
            <Select 
                className={cx('form-input')}
                data={area}
                defaultValue={inputs.area || 'Chọn khu vực'}
                label='Khu vực'
                inline
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

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
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

export default ShopForm;