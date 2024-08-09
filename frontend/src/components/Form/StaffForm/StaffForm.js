import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './StaffForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";
import { inputHandler } from "~/middlewares/inputHandler";

import * as areaService from '~/services/areaService';

const cx = classNames.bind(styles);

function StaffForm({ item, role, onClose = () => {}, updateData = () => {}, service }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        birthday: item !== undefined ? inputHandler.systemDate(item.birthday) : '',
        gender: item !== undefined ? item.gender : 'Nam',
        role: item !== undefined ? item.role : role,
        work_place: item !== undefined ? item.work_place?.data?.name : '',
        phone_number: item !== undefined ? item.phone_number : '',
        username: item !== undefined ? item.username : '',
        password: item !== undefined ? item.password : '',
    });
    const [displayRole, setDisplayRole] = useState(role);
    const [area, setArea] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    
    useEffect(() => {
        setDisplayRole(
            new Map([
                ['area_manager',  'Quản lý khu vực'],
                ['shop_manager',  'Quản lý cửa hàng'],
            ]).get(role)
        );
    }, [role]);
    
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
            // Create
            // service
            //     .createItem(
            //         inputs.name, 
            //     )
            //     .then((data) => {
            //         updateData(data);
            //     })
            console.log('[STAFF FORM]', inputs);
        } else {
            // Update
            console.log('[STAFF FORM]', inputs);
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
                    placeholder='Tên khu vực'
                    label='Tên'
                    inline
                    name='name'
                    value={inputs.name}
                    onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                    value={displayRole}
                    readOnly
                />
                <Select 
                    className={cx('form-input')}
                    data={area}
                    defaultValue={inputs.work_place || 'Chọn khu vực'}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Mật khẩu'
                    label='Mật khẩu'
                    inline
                    name='password'
                    value={inputs.password}
                    onChange={handleInputChange}
                />
            </div>
        </CustomForm>
    );
}

export default StaffForm;