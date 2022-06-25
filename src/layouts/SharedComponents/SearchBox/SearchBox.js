import { useState, useRef, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'
import * as searchServices from '~/components/services/searchService'
import 'tippy.js/dist/tippy.css'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import { SearchIcon, CloseIcon, LoadingIcon } from '~/components/Icons'
import { useDebounce } from '~/hooks'
import AccountItem from '~/components/AccountItem'
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

        const fetchAPI = async () => {
            setLoading(true)

            const result = await searchServices.search(debouncedValue)
            setLoading(false)
            setSearchResult(result)
        }
        fetchAPI()
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

    function handleTyping(e) {
        const searchInput = e.target.value

        if (searchInput.startsWith(' ')) return
        setSearchInput(searchInput)
    }

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context
        <div>
            <Tippy
                interactive
                visible={inputFocused && searchResult.length > 0}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <span className={cx('content')}>
                                <h4 className={cx('search-label')}>Accounts</h4>
                                {searchResult.map((account) => (
                                    <AccountItem key={account.id} data={account} />
                                ))}
                            </span>
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
                        onInput={handleTyping}
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
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    )
}

export default SearchBox
