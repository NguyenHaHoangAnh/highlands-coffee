import classNames from "classnames/bind";
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ className, title, children }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className='w-full'>
                <h3 className={cx('title')}>{title}</h3>
                {children}
            </div>
        </div>
    );
}

export default Card;