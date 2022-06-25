import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Tooltip from '@tippyjs/react'

import { ROUTES_CONFIG } from '~/config'
import {
    CoinIcon,
    HelpIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogOutIcon,
    MessageIcon,
    MoreIcon,
    SettingIcon,
    UploadIcon,
    UserIcon
} from '~/components/Icons'
import PopperMenu from '~/components/Popper/PopperMenu'
import SearchBox from '~/layouts/SharedComponents/SearchBox'
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
            styles: { fontFamily: 'SofiaPro', fontWeight: 400 },
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
                    code: 'ja',
                    title: '日本語（日本）'
                },
                {
                    code: 'es',
                    title: 'Español'
                },
                {
                    code: 'ko',
                    title: '한국어 (대한민국)'
                },
                {
                    code: 'th',
                    title: 'ไทย (ไทย)'
                },
                {
                    code: 'tr',
                    title: 'Türkçe (Türkiye)'
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
    function handleChange(item) {}

    let isUserLoggedIn = false

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to={ROUTES_CONFIG.home}>
                    <img src={IMAGES.logo} alt="Tiktok Logo" className={cx('logo')} />
                </Link>

                {/* Search box */}
                <SearchBox />

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
                            <Image src="" alt="" className={cx('current-user-avt')} />
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
