import React from 'react'

const PrevArrow = ({ height, width, className, style, fill = '#1E1E1E' }) => {
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
        d={'M68.976 10.6997L2.15546 10.6997'}
        stroke={'#ffffff'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M68.976 10.6997L2.15546 10.6997'}
        stroke={'#1E1E1E'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M10.6997 1L0.999959 10.6997L10.6997 20.3995'}
        stroke={'#ffffff'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M10.6997 1L0.999959 10.6997L10.6997 20.3995'}
        stroke={'#1E1E1E'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
    </svg>
  )
}
export default PrevArrow
