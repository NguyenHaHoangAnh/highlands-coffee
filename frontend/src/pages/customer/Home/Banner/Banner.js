import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';

const IMAGES = [
    {
        url: images.banner_0,
        alt: 'Banner 0',
        to: config.routes.customer_home,
    },
    {
        url: images.banner_1,
        alt: 'Banner 1',
        to: config.routes.customer_home,
    },
    {
        url: images.banner_2,
        alt: 'Banner 2',
        to: config.routes.customer_home,
    },
];


function Banner() {
    return (
        <div className='w-full'>
            <div className='w-full'>
                {IMAGES.map((image, index) => (
                    <Link to={image.to} key={index}>
                        <img className='w-full' src={image.url} alt={image.alt} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Banner;