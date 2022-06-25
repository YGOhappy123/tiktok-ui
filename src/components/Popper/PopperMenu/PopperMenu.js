import { useState } from 'react'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './PopperMenu.module.scss'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const cx = classNames.bind(styles)

function PopperMenu({ children, items = [], onChange = () => {} }, hideOnClick = false) {
    const [history, setHistory] = useState([{ data: items }])
    const currentMenu = history[history.length - 1]

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    data={item}
                    styles={currentMenu.styles}
                    onClick={() => {
                        if (isParent) {
                            // Go to next level
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    const renderResult = (attrs) => (
        <div className={cx('more-menu')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <MenuHeader title={currentMenu.title} onBack={backToPreviousLevel} />}
                <span className={cx('content')}>{renderItems()}</span>
            </PopperWrapper>
        </div>
    )

    const backToFirstLevel = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    const backToPreviousLevel = () => {
        setHistory((prev) => prev.slice(0, history.length - 1))
    }

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            placement="bottom-end"
            delay={[0, 700]}
            offset={[10, 10]}
            animation={false}
            render={renderResult}
            onHide={backToFirstLevel}
        >
            {children}
        </Tippy>
    )
}

PopperMenu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool
}

export default PopperMenu
