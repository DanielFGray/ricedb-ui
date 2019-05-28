import React from 'react'
import PropTypes from 'prop-types'

import { faImages } from '@fortawesome/free-solid-svg-icons/faImages'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons/faPenAlt'
import { faPaw } from '@fortawesome/free-solid-svg-icons/faPaw'
import { faDesktop } from '@fortawesome/free-solid-svg-icons/faDesktop'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons/faMobileAlt'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'
import { faLinux } from '@fortawesome/free-brands-svg-icons/faLinux'
import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt'

const lookup = k => ({
  dtops: faImages,
  lastfm: faMusic,
  selfies: faUser,
  dotfiles: faGitAlt,
  distros: faLinux,
  homescreens: faMobileAlt,
  stations: faDesktop,
  pets: faPaw,
  handwritings: faPenAlt,
  websites: faLink,
}[k])

const Iconify = ({ icon, ...x }) => (
  <FontAwesomeIcon i={lookup(icon)} {...x} />
)

export const FontAwesomeIcon = React.memo(
  ({ i, size, className = '', ...props }) => {
    if (!i) {
      return 'null'
    }
    const {
      icon: [width, height, , , svgPathData],
      iconName,
      prefix,
    } = i
    return (
      <svg
        aria-hidden="true"
        className={[
          'svg-inline--fa',
          `fa-${iconName}`,
          `fa-w-${Math.ceil((width / height) * 16)}`,
          size ? `fa-${size}` : '',
          className,
        ].join(' ')}
        data-icon={iconName}
        data-prefix={prefix}
        role="img"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={svgPathData} fill="currentColor" />
      </svg>
    )
  },
)

FontAwesomeIcon.displayName = 'FontAwesomeIcon'

FontAwesomeIcon.propTypes = {
  className: PropTypes.string,
  i: PropTypes.object,
  size: PropTypes.oneOf([
    'lg',
    'xs',
    'sm',
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
  ]),
}

FontAwesomeIcon.defaultProps = {
  className: '',
  i: null,
  size: null,
}

export default Iconify
