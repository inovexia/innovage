import React from 'react'

const ArrUp = props => {
  const { height = 31, width = 22, className, style } = props
  return (
    <svg
      xmlns={'//www.w3.org/2000/svg'}
      viewBox={`0 0 ${width} ${height}`}
      fill={'none'}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <path
        d={'M11 30L11 1'}
        stroke={'#352104'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
      <path
        d={'M20.6875 10.4116L10.9878 0.711874L1.288 10.4116'}
        stroke={'#352104'}
        strokeLinecap={'round'}
        strokeLinejoin={'bevel'}
      />
    </svg>
  )
}
export default ArrUp
