import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './AreaManagerForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";
import { inputHandler } from "~/middlewares/inputHandler";
import { toast } from 'react-toastify';

import * as areaService from '~/services/areaService';

const cx = classNames.bind(styles);

function AreaManagerForm({ item, role, onClose = () => {}, updateData = () => {}, service }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        birthday: item !== undefined ? inputHandler.systemDate(item.birthday) : '',
        gender: item !== undefined ? item.gender : 'Nam',
        role: item !== undefined ? item.role : role,
        work_place: item !== undefined ? item.work_place?._id : '',
        phone_number: item !== undefined ? item.phone_number : '',
        username: item !== undefined ? item.username : '',
        password: item !== undefined ? item.password : '',
    });
    const [area, setArea] = useState()

    const handleInputChange = (target) => {
        const { name, value } = target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    
    const fetchData = () => {
        areaService
            .getAvailableItem()
            .then((data) => {
                setArea(data.data);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    
    const handleSubmit = () => {
        if (item === undefined) {
            // Create
            service
                .createItem(
                    inputs.name,
                    inputs.birthday,
                    inputs.gender,
                    inputs.role,
                    inputs.work_place,
                    inputs.phone_number,
                    inputs.username,
                    inputs.password,
                )
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
                });
            // console.log('[STAFF FORM]', inputs);
        } else {
            // Update
            service
                .updateItem(
                    item._id,
                    inputs.name,
                    inputs.birthday,
                    inputs.gender,
                    inputs.role,
                    inputs.work_place,
                    inputs.phone_number,
                    inputs.username,
                    inputs.password,
                )
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
                });
            // console.log('[STAFF FORM]', inputs);
        }
        onClose();
    }
    
    return (
        <CustomForm 
            title='Thông tin quản lý khu vực' 
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin cơ bản</h3>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Tên'
                    label='Tên'
                    inline
                    name='name'
                    value={inputs.name}
                    onChange={(e) => handleInputChange(e.target)}
                />
                <div className='grid grid-cols-2 gap-16'>
                    <Input 
                        className={cx('form-input')}
                        type='date'
                        placeholder='Ngày sinh'
                        label='Ngày sinh'
                        inline
                        name='birthday'
                        value={inputs.birthday}
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    <div className='flex justify-around'>
                        <Input
                            id='staff-form-male'
                            className={cx('flex items-center', 'form-radio')}
                            type='radio'
                            label='Nam'
                            inline
                            small
                            name='gender'
                            value='Nam'
                            checked={'Nam' === inputs.gender}
                            onChange={(e) => handleInputChange(e.target)}
                        />
                        <Input
                            id='staff-form-female'
                            className={cx('flex items-center', 'form-radio')}
                            type='radio'
                            label='Nữ'
                            inline
                            small
                            name='gender'
                            value='Nữ'
                            checked={'Nữ' === inputs.gender}
                            onChange={(e) => handleInputChange(e.target)}
                        />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Chức vụ'
                    label='Chức vụ'
                    inline
                    name='role'
                    value='Quản lý khu vực'
                    readOnly
                />
                <Select 
                    className={cx('form-input')}
                    data={area}
                    value={inputs.work_place}
                    defaultValue={item?.work_place?.data?.name || 'Chọn khu vực'}
                    label='Khu vực'
                    inline
                    optionLabel='name'
                    optionValue='_id'
                    onChange={handleInputChange}
                />
            </div>

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Số điện thoại'
                    label='SĐT'
                    inline
                    name='phone_number'
                    maxLength={12}
                    value={inputHandler.phone(inputs.phone_number)}
                    onChange={(e) => handleInputChange(e.target)}
                />
            </div>

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin tài khoản</h3>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Username'
                    label='Username'
                    inline
                    name='username'
                    value={inputs.username}
                    onChange={(e) => handleInputChange(e.target)}
                />
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Mật khẩu'
                    label='Mật khẩu'
                    inline
                    name='password'
                    value={inputs.password}
                    onChange={(e) => handleInputChange(e.target)}
                />
            </div>
        </CustomForm>
    );
}

export default AreaManagerForm;