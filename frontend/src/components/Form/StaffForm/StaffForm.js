import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './StaffForm.module.scss';

import Input from '~/components/Input';
import Select from "~/components/Select";
import CustomForm from "../CustomForm";

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

function StaffForm({ item, role, onClose = () => {}, updateData = () => {}, service }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        birthday: item !== undefined ? item.birthday : '',
        gender: item !== undefined ? item.gender : 'Nam',
        role: item !== undefined ? item.role : role,
        work_place: item !== undefined ? item.work_place : '',
        phone: item !== undefined ? item.phone : '',
        email: item !== undefined ? item.email : '',
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

    const inputPhone = (value) => {
        value = value.replace(/[^0-9\s]/g, '');
        value = value.replaceAll(' ', '');
        const len = value.length;

        let count = 0;

        for (let i = 1; i <= ((len % 4 === 0) ? Math.floor(len / 4) - 1 : Math.floor(len / 4)); i++) {
            const position = i * 4 + count;
            value = `${value.slice(0, position)} ${value.slice(position)}`;
            count++;
        }

        return value;
    }
    
    useEffect(() => {
        setDisplayRole(
            new Map([
                ['area_manager',  'Quản lý khu vực'],
                ['shop_manager',  'Quản lý cửa hàng'],
            ]).get(role)
        );
    }, [role]);

    useEffect(() => {
        setArea(AREA);
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
                        value={inputs.birthday.split('/').reverse().join('-')}
                        onChange={(e) => {
                            const { name, value } = e.target;
                            setInputs((prev) => ({
                                ...prev,
                                [name]: value.split('-').reverse().join('/'),
                            }))
                        }}
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
                            checked={'Nam' === inputs.gender}
                            onChange={(e) => {
                                const { name } = e.target;
                                setInputs((prev) => ({
                                    ...prev,
                                    [name]: 'Nam',
                                }));
                            }}
                        />
                        <Input
                            id='staff-form-female'
                            className={cx('flex items-center', 'form-radio')}
                            type='radio'
                            label='Nữ'
                            inline
                            small
                            name='gender'
                            checked={'Nữ' === inputs.gender}
                            onChange={(e) => {
                                const { name } = e.target;
                                setInputs((prev) => ({
                                    ...prev,
                                    [name]: 'Nữ',
                                }));
                            }}
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
                    onChange={(workPlace) => {
                        setInputs((prev) => ({
                            ...prev,
                            // eslint-disable-next-line no-useless-computed-key
                            ['work_place']: workPlace,
                        }));
                    }}
                />
            </div>

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Email'
                    label='Email'
                    inline
                    name='email'
                    value={inputs.email}
                    onChange={handleInputChange}
                />
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Số điện thoại'
                    label='SĐT'
                    inline
                    name='phone'
                    value={inputPhone(inputs.phone)}
                    onChange={(e) => {
                        let { name, value } = e.target;
                        value = inputPhone(value);

                        if (value.replaceAll(' ', '').length <= 10) {
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
                        } 
                    }}
                />
            </div>

            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin tài khoản</h3>
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Email'
                    label='Email'
                    inline
                    name='email'
                    value={inputs.email}
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