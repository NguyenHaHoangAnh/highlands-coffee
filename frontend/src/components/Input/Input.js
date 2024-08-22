import classNames from "classnames/bind";
import styles from './Input.module.scss';
import { useId } from "react";

const cx = classNames.bind(styles);

function Input({ 
    className,
    wrapperClass,
    type,
    placeholder,
    value,
    onChange = () => {},
    label,
    inline = false,
    bigText = false,
    small = false,
    big = false,
    children,
    ...otherProps
}) {
    const id = useId();
    return (
        <>
            {label ? (
                <div className={cx('wrapper', wrapperClass, { inline, bigText, small, big })}>
                    <label className={cx('font-semibold','label')} htmlFor={id}>{label}</label>
                    <div className={cx('container', className)}>
                        {bigText ? (
                            <textarea 
                                rows={3}
                                id={id}
                                className={cx('w-full h-full', 'input')}
                                type={type}
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                                {...otherProps}
                            />
                        ) : (
                            <input 
                                id={id}
                                className={cx('w-full h-full', 'input')}
                                type={type}
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                                autoComplete='off'
                                {...otherProps}
                            />
                        )}
                        {!!children && children}
                    </div>
                </div>
            ) : (
                <div className={cx('container', className)}>
                    {bigText ? (
                        <textarea
                            rows={3}
                            id={id}
                            className={cx('w-full h-full', 'input')}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            {...otherProps}
                        />
                    ) : (
                        <input 
                            id={id}
                            className={cx('w-full h-full', 'input')}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            autoComplete='off'
                            {...otherProps}
                        />
                    )}
                    {!!children && children}
                </div>
            )}
        </>
    );
}

export default Input;