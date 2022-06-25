import { GoBackIcon } from '~/components/Icons'
import PropTypes from 'prop-types'
import className from 'classnames/bind'
import styles from './PopperMenu.module.scss'

const cx = className.bind(styles)

function MenuHeader({ title, onBack }) {
    return (
        <div className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <GoBackIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </div>
    )
}

MenuHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired
}

export default MenuHeader
