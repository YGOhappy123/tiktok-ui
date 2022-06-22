import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import Tooltip from '@tippyjs/react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import {
    CloseIcon,
    CoinIcon,
    HelpIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogOutIcon,
    MessageIcon,
    MoreIcon,
    SearchIcon,
    SettingIcon,
    UploadIcon,
    UserIcon
} from '~/components/Icons'
import PopperMenu from '~/components/Popper/PopperMenu'
import AccountItems from '~/components/AccountItems'
import Image from '~/components/Image'
import Button from '~/components/Button'
import styles from './Header.module.scss'
import IMAGES from '~/assets/images'

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: LanguageIcon,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
                {
                    code: 'jp',
                    title: '日本語（日本）'
                }
            ]
        }
    },
    {
        icon: HelpIcon,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: KeyboardIcon,
        title: 'Keyboard shortcuts'
    }
]

const USER_MENU = [
    {
        icon: UserIcon,
        title: 'View profile',
        to: '/@huyha2105'
    },
    {
        icon: CoinIcon,
        title: 'Get coins',
        to: '/coin'
    },
    {
        icon: SettingIcon,
        title: 'Setting',
        to: '/setting'
    },
    ...MENU_ITEMS,
    {
        icon: LogOutIcon,
        title: 'Log out',
        to: '/',
        separated: true
    }
]

function Header() {
    const [searchResult, setSearchResult] = useState([])

    function handleChange(item) {}

    let isUserLoggedIn = false

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to="/">
                    <img src={IMAGES.logo} alt="Tiktok Logo" className={cx('logo')} />
                </Link>

                {/* Search box */}
                <Tippy
                    interactive
                    // visible={searchResult.length > 0}
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-label')}>Accounts</h4>
                                <AccountItems />
                                <AccountItems />
                                <AccountItems />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search-box')}>
                        <input type="text" placeholder="Search accounts and videos" spellCheck="false" />
                        <button className={cx('clear-btn')}>
                            <CloseIcon />
                        </button>
                        {/* <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} /> */}
                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </Tippy>

                {/* Actions */}
                <div className={cx('actions')}>
                    <Button type="text" leftIcon={UploadIcon}>
                        Upload
                    </Button>
                    {isUserLoggedIn ? (
                        <div className={cx('current-user')}>
                            <Tooltip content="Message" placement="bottom">
                                <button className={cx('control-btn', 'message-btn')} data-new-status="12">
                                    <MessageIcon />
                                </button>
                            </Tooltip>
                            <Tooltip content="Inbox" placement="bottom">
                                <button className={cx('control-btn', 'inbox-btn')} data-new-status="34">
                                    <InboxIcon />
                                </button>
                            </Tooltip>
                        </div>
                    ) : (
                        <Button type="primary">Log in</Button>
                    )}
                    <PopperMenu items={isUserLoggedIn ? USER_MENU : MENU_ITEMS} onChange={handleChange}>
                        {isUserLoggedIn ? (
                            <Image
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1692568374729730.jpeg?x-expires=1655978400&x-signature=mzVC260huQOIPE4wigfgA%2FaZoao%3"
                                alt=""
                                className={cx('current-user-avt')}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <MoreIcon />
                            </button>
                        )}
                    </PopperMenu>
                </div>
            </div>
        </div>
    )
}

export default Header
