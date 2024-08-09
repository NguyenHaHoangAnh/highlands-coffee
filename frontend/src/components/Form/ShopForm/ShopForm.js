import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ShopForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";

import { inputHandler } from '~/middlewares/inputHandler';

import * as areaService from '~/services/areaService';
import * as shopService from '~/services/shopService';

const cx = classNames.bind(styles);

function ShopForm({ item, onClose = () => {}, updateData = () => {} }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        area: item !== undefined ? item.area?.data?.name : '',
        address: item !== undefined ? item.address : '',
        phone_number: item !== undefined ? item.phone_number : '',
    });
    const [area, setArea] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        if (item === undefined) {
            console.log('[shop form]', inputs);
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
                optionLabel='name'
                optionValue='_id'
                onChange={(work_place_id) => {
                    setInputs((prev) => ({
                        ...prev,
                        // eslint-disable-next-line no-useless-computed-key
                        ['work_place']: work_place_id,
                    }));
                }}
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
                name='phone_number'
                value={inputHandler.phone(inputs.phone_number)}
                maxLength={12}
                onChange={handleInputChange}
            />
        </CustomForm>
    );
}

export default ShopForm;