import classNames from "classnames/bind";
import styles from './Select.module.scss';
import { useEffect, useRef, useState } from "react";

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
    value,
    optionLabel,
    optionValue = optionLabel,
    readOnly = false,
    onChange=() => {},
    ...otherProps
}) {
    const [isActive, setIsActive] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(defaultValue);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue);
    const selectRef = useRef();

    useEffect(() => {
        // Lấy value và label trong data lần đầu nếu value != default value
        const selectedItem = data.find((item) => item[optionValue] === selectedValue);
        if (selectedItem) {
            setSelectedLabel(selectedItem[optionLabel]);
            setSelectedValue(selectedItem[optionValue]);
        }
    }, [data, optionLabel, optionValue, selectedValue]);

    const handleSelectItem = (item) => {
        setSelectedLabel(item[optionLabel]);
        setSelectedValue(item[optionValue]);
        // onChange(item[optionValue]);
    }

    useEffect(() => {
        // Thay đổi value
        if (selectRef.current) {
            onChange(selectRef.current);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue, selectRef]);

    useEffect(() => {
        // nếu value = default => value và label = default
        if (value === defaultValue) {
            setSelectedLabel(defaultValue);
            setSelectedValue(value);
        }
    }, [value, defaultValue]);

    return (
        <>
            {label ? (
                <div 
                    className={cx('wrapper', { inline })}
                    onClick={() => {
                        if (!readOnly) {
                            setIsActive(!isActive);
                        }
                    }}
                >
                    <label className={cx('font-semibold', 'label')} htmlFor={id}>{label}</label>
                    <div id={id} className={cx('container', className)}>
                        <div className={cx('select-input')} {...otherProps}>{selectedLabel}</div>
                        <input className='hidden' name={name} value={selectedValue} ref={selectRef} readOnly />
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
                    onClick={() => {
                        if (!readOnly) {
                            setIsActive(!isActive);
                        }
                    }}
                >
                    <div className={cx('select-input')} {...otherProps}>{selectedLabel}</div>
                    <input className='hidden' name={name} value={selectedValue} ref={selectRef} readOnly />
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