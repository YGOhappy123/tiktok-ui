import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './AccountItems.module.scss'

const cx = classNames.bind(styles)

function AccountItems() {
    return (
        <div className={cx('wrapper')}>
            <img src="https://i.9mobi.vn/cf/Images/huy/2021/12/6/anh-gai-xinh-3.jpg" alt="" className={cx('avatar')} />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>huyha2105</span>
                    <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
                </h4>
                <p className={cx('name')}>Hà Gia Huy 159</p>
            </div>
        </div>
    )
}

export default AccountItems
