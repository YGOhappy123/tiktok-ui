import className from 'classnames/bind'
import styles from './PopperMenu.module.scss'
import Button from '~/components/Button/Button'

const cx = className.bind(styles)

function MenuItem({ data, onClick, style }) {
    const classes = cx('menu-item', { separated: data.separated })

    return (
        <Button leftIcon={data.icon} to={data.to} className={classes} onClick={onClick}>
            {data.title}
        </Button>
    )
}

export default MenuItem
