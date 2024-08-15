import classNames from "classnames/bind";
import { useState } from "react";
import styles from './DrinksForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";
import { inputHandler } from "~/middlewares/inputHandler";
import { toast } from 'react-toastify';

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

    const handleInputChange = (target) => {
        const { name, value } = target;
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
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
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
                .then((data) => {
                    if (data?.message) {
                        updateData();
                        toast.success(data?.message);
                    } else {
                        toast.error(data?.error);
                    }
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
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    
                    <Input 
                        className={cx('form-input')}
                        type='text'
                        placeholder='Url ảnh'
                        label='Ảnh'
                        inline
                        name='image'
                        value={inputs.image}
                        onChange={(e) => handleInputChange(e.target)}
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
                        onChange={(e) => handleInputChange(e.target)}
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
                            onChange={(e) => handleInputChange(e.target)}
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
                            onChange={(e) => handleInputChange(e.target)}
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
                            onChange={(e) => handleInputChange(e.target)}
                        />
                    </div>
                </div>
            </div>
        </CustomForm>
    );
}

export default DrinksForm;