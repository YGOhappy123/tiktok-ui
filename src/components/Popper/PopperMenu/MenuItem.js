import Button from '~/components/Button/Button'
import PropTypes from 'prop-types'
import className from 'classnames/bind'
import styles from './PopperMenu.module.scss'

const cx = className.bind(styles)

function MenuItem({ data, onClick, styles }) {
    const classes = cx('menu-item', { separated: data.separated })

    return (
        <Button leftIcon={data.icon} to={data.to} className={classes} onClick={onClick} styles={styles}>
            {data.title}
        </Button>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object
}

export default MenuItem
