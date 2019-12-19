import React from 'react'

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

function lookup(k) {
  return {
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
  }[k]
}
export default function Iconify ({ icon, ...x }) {
  return(
    <FontAwesomeIcon i={lookup(icon)} {...x /* eslint-disable-line react/jsx-props-no-spreading */} />
  )
}

export const FontAwesomeIcon = React.memo(
  ({ i, size, className = '', ...props }) => {
    if (! i) {
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
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
      >
        <path d={svgPathData} fill="currentColor" />
      </svg>
    )
  },
)

FontAwesomeIcon.displayName = 'FontAwesomeIcon'

FontAwesomeIcon.defaultProps = {
  className: '',
  i: null,
  size: null,
}
