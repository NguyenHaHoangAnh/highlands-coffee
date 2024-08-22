import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from './Tab.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Tab({ data }) {
    const [children, setChildren] = useState(data[0].content);
    const orderTabRef = useRef();

    useEffect(() => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);

        tabs[0].classList.add(cx('active'));
        tabs.forEach((tab, index) => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
                setChildren(data[index].content);
            } else {
                if (!tab.classList.contains(cx('disable'))) {
                    tab.classList.add(cx('disable'));
                }
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTabClick = (e) => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);
        const tab = e.currentTarget;
        
        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                tab.classList.remove(cx('active'));
            }
            if (!tab.classList.contains(cx('disable'))) {
                tab.classList.add(cx('disable'));
            }
        });

        if (tab.classList.contains(cx('disable'))) {
            tab.classList.remove(cx('disable'));
        }
        if (!tab.classList.contains(cx('active'))) {
            tab.classList.add(cx('active'));
        }

        tabs.forEach((tab, index) => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
                setChildren(data[index].content);
            }
        });
    }

    const handleTabHover = (e) => {
        const orderTab = orderTabRef.current;
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);
        const tab = e.currentTarget;

        line.style.left = `${tab.offsetLeft}px`;
        line.style.width = `${tab.offsetWidth}px`;
    }

    const handleTabNotHover = () => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);

        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
            }
        });
    }

    return (
        <div>
            <div className={cx('mb-8', 'tab')} ref={orderTabRef}>
                {data && data.map((item, index) => (
                    <Button 
                        className={cx('tab-btn')} 
                        key={index}
                        onClick={handleTabClick}
                        onMouseOver={handleTabHover}
                        onMouseOut={handleTabNotHover}
                    >
                        {item.title}
                    </Button>
                ))}
                <div className={cx('tab-line')}></div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Tab;