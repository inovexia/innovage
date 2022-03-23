import React from 'react'

const NextArrow = ({ height, width, className, style, fill = '#1E1E1E' }) => {
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={'0 0 69 23'}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <path
        d={'M0.976074 10.6997L67.7966 10.6997'}
        stroke={'#ffffff'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M0.976074 10.6997L67.7966 10.6997'}
        stroke={'#1E1E1E'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M59.2522 20.3994L68.9519 10.6997L59.2522 0.999919'}
        stroke={'#ffffff'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M59.2522 20.3994L68.9519 10.6997L59.2522 0.999919'}
        stroke={'#1E1E1E'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
    </svg>
  )
}
export default NextArrow
