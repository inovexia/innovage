import React from 'react'
import TopFooter from './top-footer'
import BottomFooter from './bottom-footer'


const Footer = () => {
  
  return (
      <>
      <footer className={`bg-dark py-5`}>
          <TopFooter/>
          <BottomFooter/>
      </footer>
      </>
  )
}

export default Footer