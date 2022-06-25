import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
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
    styles,
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
            return <IconComponent className={cx('icon')} />
        }
    }

    return (
        <CompElement className={classes} {...props}>
            {leftIcon && displayIcon(leftIcon)}
            <span style={styles && styles}>{children}</span>
            {rightIcon && displayIcon(rightIcon)}
        </CompElement>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.elementType,
    rightIcon: PropTypes.elementType,
    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node.isRequired
}

export default Button
