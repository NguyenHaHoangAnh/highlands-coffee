import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './Tea.module.scss';

import Slider from '~/components/Slider';

import * as teaService from '~/services/teaService';

const cx = classNames.bind(styles);

function Tea() {
    const [data, setData] = useState();

    useEffect(() => {
        teaService
            .getAllItem()
            .then(data => setData(data));
    }, []);
    
    return (
        <div className='w-full pt-36 pb-20'>
            <div className='w-full px-20'>
                <div className='w-8/12'>
                    <div className={cx('box')}>
                        <div className={cx('mb-8', 'box-title')}>
                            <h1>Tea</h1>
                        </div>
                        <div className={cx('box-content')}>
                            <div className={cx('description')}>
                                Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica 
                                thượng hạng được trồng trên những vùng cao nguyên Việt Nam màu mỡ, 
                                qua những bí quyết rang xay độc đáo, Highlands Tea chúng tôi 
                                tự hào giới thiệu những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
                            </div>
                            <Slider data={data} rows={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tea;