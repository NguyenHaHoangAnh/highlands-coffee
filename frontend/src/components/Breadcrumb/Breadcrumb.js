import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Breadcrumb.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function Breadcrumb({ header, data }) {
    return (
        <div className='w-full mb-8'>
            <ul className='flex items-baseline'>
                <li className={cx('breadcrumb-item')}>
                    <h3 className={cx('font-semibold', 'header')}>{header}</h3>
                </li>
                {data && data.map((item, index) => (
                    item.to ? (
                        <li className={cx('breadcrumb-item')} key={index}>
                            <Link to={item.to}>
                                {item.icon && <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={item.icon} />}
                                {item.title}
                            </Link>
                        </li>
                    ) : (
                        <li className={cx('breadcrumb-item')} key={index}>
                            {item.title}
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}

export default Breadcrumb;