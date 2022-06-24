import { useState, useRef, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import { SearchIcon, CloseIcon, LoadingIcon } from '~/components/Icons'
import { useDebounce } from '~/hooks'
import AccountItems from '~/components/AccountItems'
import className from 'classnames/bind'
import styles from './SearchBox.module.scss'

const cx = className.bind(styles)

function SearchBox() {
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [inputFocused, setInputFocused] = useState(false)
    const [loading, setLoading] = useState(false)

    const debouncedValue = useDebounce(searchInput, 500)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [debouncedValue])

    const inputElement = useRef()

    function handleClearInput() {
        setSearchInput('')
        setSearchResult([])
        inputElement.current.focus()
    }

    function handleClickOutside() {
        setInputFocused(false)
    }

    return (
        <Tippy
            interactive
            visible={inputFocused && searchResult.length > 0}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-label')}>Accounts</h4>
                        {searchResult.map((account) => (
                            <AccountItems key={account.id} data={account} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleClickOutside}
        >
            <div className={cx('search-box')}>
                <input
                    type="text"
                    placeholder="Search accounts and videos"
                    spellCheck="false"
                    value={searchInput}
                    onInput={(e) => {
                        if (e.target.value.startsWith(' ')) return
                        setSearchInput(e.target.value)
                    }}
                    onFocus={() => setInputFocused(true)}
                    ref={inputElement}
                />
                {searchInput && !loading && (
                    <button className={cx('clear-btn')} onClick={handleClearInput}>
                        <CloseIcon />
                    </button>
                )}
                {loading && (
                    <span className={cx('loading-icon')}>
                        <LoadingIcon />
                    </span>
                )}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </Tippy>
    )
}

export default SearchBox
