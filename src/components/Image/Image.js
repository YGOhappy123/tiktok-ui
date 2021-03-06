import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import IMAGES from '~/assets/images'
import className from 'classnames/bind'
import styles from './Image.module.scss'

const cx = className.bind(styles)

const Image = forwardRef(({ src, alt, className, altImage: fallback, ...props }, ref) => {
    const [altImage, setAltImage] = useState('')

    let classes = cx('wrapper', className)

    function handleError() {
        setAltImage(fallback ? fallback : IMAGES.noImage)
    }

    return <img ref={ref} src={altImage || src} alt={alt} {...props} onError={handleError} className={classes} />
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string
}

export default Image
