import classNames from "classnames/bind";
import styles from './CustomForm.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function CustomForm({ className, title, children, submitLabel, onClose, onSubmit }) {
    return (
        <div className={cx('w-full', 'wrapper', className)}>
            <div className={cx('container')}>
                <header>
                    <h1 className={cx('text-center', 'form-header')}>
                        {title}
                    </h1>
                    <Button 
                        className={cx('absolute flex justify-center items-center', 'close-btn')}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </header>
                <main>
                    {children}
                    <Button 
                        className={cx('submit-btn', 'w-full')} 
                        primary 
                        onClick={onSubmit}
                    >
                    {submitLabel || 'Lưu'}
                    </Button>
                </main>
            </div>
        </div>
    );
}

export default CustomForm;