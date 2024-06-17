import classNames from "classnames/bind";
import { useState } from "react";
import styles from './DrinksForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";

const cx = classNames.bind(styles);

function DrinksForm({ item, onClose = () => {}, updateData = () => {}, service }) {
    const [inputs, setInputs] = useState({
        name: item !== undefined ? item.name : '',
        image: item !== undefined ? item.image : '',
        description: item !== undefined ? item.description : '',
        priceS: item !== undefined ? item.small.price : '',
        priceM: item !== undefined ? item.medium.price : '',
        priceL: item !== undefined ? item.large.price : '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const inputCurrency = (value) => {
        value =  value.replace(/[^0-9\s]/g, '');
        value = value.replaceAll(',', '');
        const len = value.length;

        let count = 0;
        
        for (let i = 1; i <= ((len % 3 === 0) ? Math.floor(len / 3) - 1 : Math.floor(len / 3)); i++) {
            const position = - (i * 3 + count);
            value = `${value.slice(0, position)},${value.slice(position)}`;
            count++;
        }

        return value;
    }

    const handleSubmit = () => {
        if (item === undefined) {
            // Create
            service
                .createItem(
                    inputs.name, 
                    inputs.image, 
                    inputs.description, 
                    Number(String(inputs.priceS).replaceAll(',', '')),
                    Number(String(inputs.priceM).replaceAll(',', '')),
                    Number(String(inputs.priceL).replaceAll(',', '')),
                )
                .then(() => {
                    // console.log('[CREATE]', data);
                    // updateData(data, (prevData, newData) => ([newData, ...prevData]));
                    updateData();
                })
        } else {
            // Update
            service
                .updateItem(
                    item._id,
                    inputs.name, 
                    inputs.image, 
                    inputs.description, 
                    Number(String(inputs.priceS).replaceAll(',', '')),
                    Number(String(inputs.priceM).replaceAll(',', '')),
                    Number(String(inputs.priceL).replaceAll(',', '')),
                )
                .then(() => {
                    // console.log('[UPDATE]', data);
                    // updateData(data, (prevData, newData) => (
                    //     prevData.forEach((item, index) => {
                    //         if (item._id === newData._id) {
                    //             prevData[index] = newData;
                    //         }
                    //     })
                    // ));
                    updateData();
                })
        }
        onClose();
    }
    
    return (
        <CustomForm
            title='Thông tin sản phẩm'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className='flex'>
                <div className={cx('image')}>
                    <img src={inputs.image} alt={`Ảnh ${inputs.name}`} />
                </div>

                <div className='flex-1'>
                    <Input 
                        className={cx('form-input')}
                        type='text'
                        placeholder='Tên sản phẩm'
                        label='Tên'
                        inline
                        name='name'
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    
                    <Input 
                        className={cx('form-input')}
                        type='text'
                        placeholder='Url ảnh'
                        label='Ảnh'
                        inline
                        name='image'
                        value={inputs.image}
                        onChange={handleInputChange}
                    />
                    
                    
                    <Input 
                        className={cx('form-input')}
                        type='text'
                        placeholder='Mô tả'
                        label='Mô tả'
                        inline
                        big
                        name='description'
                        value={inputs.description}
                        onChange={handleInputChange}
                    />
                    
                    <div className='grid grid-cols-3 gap-8'>
                        <Input 
                            className={cx('form-input')}
                            type='text'
                            placeholder='Giá'
                            label='Size S'
                            inline
                            name='priceS'
                            value={inputCurrency(String(inputs.priceS))}
                            onChange={(e) => {
                                let { name, value } = e.target;
                                value =  inputCurrency(value);
                                
                                if (value.replaceAll(',', '').length < 10) {
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
                        
                        <Input 
                            className={cx('form-input')}
                            type='text'
                            placeholder='Giá'
                            label='Size M'
                            inline
                            name='priceM'
                            value={inputCurrency(String(inputs.priceM))}
                            onChange={(e) => {
                                let { name, value } = e.target;
                                value =  inputCurrency(value);
                                
                                if (value.replaceAll(',', '').length < 10) {
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
                        
                        <Input 
                            className={cx('form-input')}
                            type='text'
                            placeholder='Giá'
                            label='Size L'
                            inline
                            name='priceL'
                            value={inputCurrency(String(inputs.priceL))}
                            onChange={(e) => {
                                let { name, value } = e.target;
                                value =  inputCurrency(value);
                                
                                if (value.replaceAll(',', '').length < 10) {
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
                </div>
            </div>
        </CustomForm>
    );
}

export default DrinksForm;