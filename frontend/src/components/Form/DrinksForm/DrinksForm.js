import classNames from "classnames/bind";
import { useState } from "react";
import styles from './DrinksForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";
import { inputHandler } from "~/middlewares/inputHandler";

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

    const handleSubmit = () => {
        if (item === undefined) {
            // Create
            service
                .createItem(
                    inputs.name, 
                    inputs.image, 
                    inputs.description, 
                    inputHandler.currencyToNumber(inputs.priceS),
                    inputHandler.currencyToNumber(inputs.priceM),
                    inputHandler.currencyToNumber(inputs.priceL),
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
                    inputHandler.currencyToNumber(inputs.priceS),
                    inputHandler.currencyToNumber(inputs.priceM),
                    inputHandler.currencyToNumber(inputs.priceL),
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
                            maxLength={7}
                            value={inputHandler.currency(inputs.priceS)}
                            onChange={handleInputChange}
                        />
                        
                        <Input 
                            className={cx('form-input')}
                            type='text'
                            placeholder='Giá'
                            label='Size M'
                            inline
                            name='priceM'
                            maxLength={7}
                            value={inputHandler.currency(inputs.priceM)}
                            onChange={handleInputChange}
                        />
                        
                        <Input 
                            className={cx('form-input')}
                            type='text'
                            placeholder='Giá'
                            label='Size L'
                            inline
                            name='priceL'
                            maxLength={7}
                            value={inputHandler.currency(inputs.priceL)}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </CustomForm>
    );
}

export default DrinksForm;