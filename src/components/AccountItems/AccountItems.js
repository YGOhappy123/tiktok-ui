import { UserTickIcon } from '~/components/Icons'
import Image from '~/components/Image'
import classNames from 'classnames/bind'
import styles from './AccountItems.module.scss'

const cx = classNames.bind(styles)

function AccountItems({ data }) {
    return (
        <a href={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image src={data.avatar} alt={data.full_name} className={cx('avatar')} />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <UserTickIcon className={cx('icon')} />}
                </h4>
                <p className={cx('name')}>{data.full_name}</p>
            </div>
        </a>
    )
}

export default AccountItems
