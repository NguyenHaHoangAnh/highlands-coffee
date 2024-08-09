import classNames from "classnames/bind";
import styles from './Select.module.scss';
import { useState } from "react";

import Popper from '~/components/Popper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Select({ 
    id,
    className,
    data = [], 
    defaultValue, 
    label,
    inline = false,
    name,
    optionLabel,
    optionValue = optionLabel,
    onChange=() => {},
    ...otherProps
}) {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState();

    const handleSelectItem = (item) => {
        setValue(item[optionLabel]);
        onChange(item[optionValue]);
    }

    return (
        <>
            {label ? (
                <div 
                    className={cx('wrapper', { inline })}
                    onClick={() => setIsActive(!isActive)}
                >
                    <label className={cx('font-semibold', 'label')} htmlFor={id}>{label}</label>
                    <div id={id} className={cx('container', className)}>
                        <div className={cx('select-input')} {...otherProps}>{value || defaultValue}</div>
                        <FontAwesomeIcon 
                            className={cx('select-icon')} 
                            icon={isActive ? faChevronUp : faChevronDown} 
                        />
                        <Popper 
                            className={cx('select-popper', 
                                { active: isActive, })
                            }
                        >
                            <ul>
                                {data.map((item, index) => (
                                    <li 
                                        className={cx('select-item')}
                                        key={index}
                                        onClick={() => handleSelectItem(item)} 
                                    >
                                        {item[optionLabel]}
                                    </li>
                                ))}
                            </ul>
                        </Popper>
                    </div>
                </div>
            ) : (
                <div 
                    className={cx('container', inline)}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div className={cx('select-input')} {...otherProps}>{value || defaultValue}</div>
                    <FontAwesomeIcon 
                        className={cx('select-icon')} 
                        icon={isActive ? faChevronUp : faChevronDown} 
                    />
                    <Popper 
                        className={cx('select-popper', 
                            { active: isActive, })
                        }
                    >
                        <ul>
                            {data.map((item, index) => (
                                <li 
                                    className={cx('select-item')}
                                    key={index}
                                    onClick={() => handleSelectItem(item)} 
                                >
                                    {item[optionLabel]}
                                </li>
                            ))}
                        </ul>
                    </Popper>
                </div>
            )}
        </>
    );
}

export default Select;