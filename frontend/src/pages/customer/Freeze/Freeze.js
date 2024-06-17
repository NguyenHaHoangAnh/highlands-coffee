import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './Freeze.module.scss';

import Slider from '~/components/Slider';

import * as freezeService from '~/services/freezeService';

const cx = classNames.bind(styles);

function Freeze() {
    const [data, setData] = useState();

    useEffect(() => {
        freezeService
            .getAllItem()
            .then(data => setData(data));
    }, []);
    
    return (
        <div className='w-full pt-36 pb-20'>
            <div className='w-full px-20'>
                <div className='w-8/12'>
                    <div className={cx('box')}>
                        <div className={cx('mb-8', 'box-title')}>
                            <h1>Freeze</h1>
                        </div>
                        <div className={cx('box-content')}>
                            <div className={cx('description')}>
                                Sảng khoái với thức uống đá xay phong cách Việt. 
                                Freeze là thức uống đá xay mát lạnh được pha chế từ những nguyên liệu thuần túy của Việt Nam.
                            </div>
                            <Slider data={data} rows={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Freeze;