import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    children,
    type = 'text',
    size = 'm',
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    ...otherProps
}) {
    let CompElement = 'button'
    const props = { ...otherProps }

    // Remove event listener while button disabled
    if (disabled) {
        const keysArr = Object.keys(props)
        keysArr.forEach((key) => {
            if (key.startsWith('on')) {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        CompElement = Link
    } else if (href) {
        props.href = href
        CompElement = 'a'
    }

    let classes = cx('wrapper', type, size, className, { disabled })

    function displayIcon(icon) {
        if (icon.prefix) {
            return <FontAwesomeIcon icon={icon} className={cx('icon')} />
        } else {
            const IconComponent = icon
            return <IconComponent classes={cx('icon')} />
        }
    }

    return (
        <CompElement className={classes} {...props}>
            {leftIcon && displayIcon(leftIcon)}
            <span>{children}</span>
            {rightIcon && displayIcon(rightIcon)}
        </CompElement>
    )
}

export default Button
