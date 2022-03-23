import React from 'react'

const Close = ({ height, width, className, style, fill = '#1E1E1E' }) => {
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 26 26'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <rect
        x="18.7383"
        y="6.01044"
        width="1"
        height="18"
        rx="0.5"
        transform="rotate(45 18.7383 6.01044)"
        fill="#1E1E1E"
      />
      <rect
        x="19.4453"
        y="18.7383"
        width="1"
        height="18"
        rx="0.5"
        transform="rotate(135 19.4453 18.7383)"
        fill="#1E1E1E"
      />
    </svg>
  )
}
export default Close
