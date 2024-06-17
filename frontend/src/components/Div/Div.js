import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from './Div.module.scss';

const cx = classNames.bind(styles);

function Div({ className, children }) {
    const divRef = useRef();

    const isInView = (div) => {
        // Initial window's height
        const windowHeight = window.innerHeight;
        // Initial div top & height
        const top = div.getBoundingClientRect().top;
        const height = (div.offsetHeight > windowHeight) ? div.offsetHeight * 0.5 : div.offsetHeight;

        if (windowHeight >= top + height * 0.5 && 
            top >= 0 - height * 0.5 && 
            windowHeight - 100 >= top) {
            return true;
        } 

        return false;
    }

    const handleScroll = () => {
        const div = divRef.current;
        
        if (isInView(div)) {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const div = divRef.current;
        if (isInView(div)) {
            div.style.opacity = 1;
            div.style.transform = 'translateY(0)';
        }
    }, []);

    return (
        <div ref={divRef} className={cx('wrapper', className)}>
            {children}
        </div>
    );
}

export default Div;