import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import IMAGES from '~/assets/images'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img src={IMAGES.logo} alt="Tiktok Logo" className={cx('logo')} />
                </Link>
                <div className={cx('search-box')}>
                    <input type="text" placeholder="Search accouts and videos" spellcheck="false" />
                    {/* <button className={cx('clear-btn')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button> */}
                    <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('actions')}></div>
            </div>
        </div>
    )
}

export default Header
