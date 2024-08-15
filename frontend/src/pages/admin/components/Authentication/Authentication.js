import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Authentication.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { AuthUserContext } from '../../../../components/AuthUserProvider';

import * as authService from '~/services/authService';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Authentication() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const context = useContext(AuthUserContext);
    

    const handleInputChange = (target) => {
        const { name, value } = target;
        setInputs((prev) => ({
            ...prev,
            [name]:  value,
        }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = () => {
        authService
            .login(inputs.username, inputs.password)
            .then((res) => {
                if (res?.message) {
                    toast.success(res?.message);
                    // Save token & id in localhost
                    window.localStorage.setItem('token', res.token);
                    window.localStorage.setItem('id', res.id);
                    // Get user by id
                    userService
                        .getUserById(res.id)
                        .then((res) => {
                            if (res?.message) {
                                context.handleChangeUser(res?.data);
                            } else {
                                context.handleChangeUser();
                            }
                        })
                    setTimeout(() => {
                        navigate(config.routes.customer_home);
                    }, 200);
                } else {
                    toast.error(res?.error);
                }
            });
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
                        placeholder='Username'
                        name='username'
                        value={inputs.username}
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    <Input 
                        className={cx('form-input')}
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Mật khẩu'
                        name='password'
                        value={inputs.password}
                        onChange={(e) => handleInputChange(e.target)}
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