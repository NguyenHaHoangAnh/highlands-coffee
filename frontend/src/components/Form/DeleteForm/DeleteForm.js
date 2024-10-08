import classNames from "classnames/bind";
import styles from './DeleteForm.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function DeleteForm({ item, onClose = () => {}, updateData = () => {}, service }) {
    const handleSubmit = () => {
        service
            .deleteItem(item._id)
            .then((data) => {
                if (data?.message) {
                    updateData();
                    toast.success(data?.message);
                } else {
                    toast.error(data?.error);
                }
            })
        onClose();
    }
    
    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className={cx('container')}>
                <header>
                    <h1 className={cx('text-center', 'form-header')}>
                        Bạn có chắc chắn muốn xóa "{item && item.name}"?
                    </h1>
                    <Button 
                        className={cx('absolute flex justify-center items-center', 'close-btn')}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </header>
                <main>
                    <div className='grid grid-cols-2 gap-8'>
                        <Button 
                            className={cx('submit-btn')} 
                            primary 
                            onClick={handleSubmit}
                        >
                            Xóa
                        </Button>
                        <Button 
                            className={cx('submit-btn')} 
                            outline 
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DeleteForm;