import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Footer.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className='w-full flex'>
                <div className={cx('mr-8', 'social')}>
                    <ul className='flex'>
                        <li className={cx('social-link')}>
                            <Button href='https://www.facebook.com/highlandscoffeevietnam/' target='_blank'>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Button>
                        </li>
                        <li className={cx('social-link')}>
                            <Button href='https://www.youtube.com/channel/UCHEqa2uTf8uXrGWrnU3ThgA' target='_blank'>
                                <FontAwesomeIcon icon={faYoutube} />
                            </Button>
                        </li>
                        <li className={cx('social-link')}>
                            <Button href='https://www.instagram.com/highlandscoffeevietnam/' target='_blank'>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={cx('mr-10', 'copy-right')}>© 2018 Highlands Coffee. All rights reserved</div>
                <div className={cx('mr-10', 'footer-link')}>
                    <FontAwesomeIcon className='mr-4' icon={faPaperPlane} />
                    Đăng ký để nhận bản tin
                </div>
                <div className={cx('footer-link')}>
                    <Link>
                        <FontAwesomeIcon className='mr-4' icon={faEnvelope} />
                        customerservice@highlandscoffee.com.vn
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;