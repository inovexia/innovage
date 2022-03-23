import React from 'react'

const Minus = ({ height, width, className, style, fill = '#1E1E1E' }) => {
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 19 2'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <rect
        x="18.5"
        y="0.5"
        width="1"
        height="18"
        rx="0.5"
        transform="rotate(90 18.5 0.5)"
        fill="#1E1E1E"
      />
    </svg>
  )
}
export default Minus
