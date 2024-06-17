import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Authentication.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Authentication() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]:  value,
        }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = () => {

    }

    return (
        <div className='w-full h-screen'>
            <div className='flex w-full h-full'>
                <div className={cx('flex-1', 'image')}></div>
                <div className={cx('flex', 'flex-col', 'justify-center', 'form')}>
                    <h1 className={cx('form-header')}>Đăng nhập</h1>
                    <Input 
                        className={cx('form-input')}
                        type='text' 
                        placeholder='Email'
                        name='name'
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    <Input 
                        className={cx('form-input')}
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Mật khẩu'
                        name='password'
                        value={inputs.password}
                        onChange={handleInputChange}
                    >
                        <Button className={cx('input-btn')} onClick={handleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </Button>
                    </Input>
                    <Button className={cx('w-full', 'submit-btn')} primary onClick={handleSubmit}>Đăng nhập</Button>
                </div>
            </div>
        </div>
    );
}

export default Authentication;