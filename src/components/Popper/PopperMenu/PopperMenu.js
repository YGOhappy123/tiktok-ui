import { useState } from 'react'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import classNames from 'classnames/bind'
import styles from './PopperMenu.module.scss'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const cx = classNames.bind(styles)

function PopperMenu({ children, items = [], onChange = () => {} }) {
    const [history, setHistory] = useState([{ data: items }])
    const currentMenu = history[history.length - 1]

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 700]}
            offset={[10, 10]}
            render={(attrs) => (
                <div className={cx('more-menu')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <MenuHeader
                                title={currentMenu.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, history.length - 1))
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}

export default PopperMenu
