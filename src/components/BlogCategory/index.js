import React from 'react'
import Main from './Main'
import Sidebar from './sidebar'



const BlogCategory = ({ blogData }) => {
  return (
    <section className={'blog pb-5'}>
        <div className={'container-fluid'}>
            <div className={`page-title`}>
            <h1>{blogData.title}</h1>
            </div>
        
      </div>
      <div className={'container-fluid'}>
        <div className={'blog-inner'}>
          <div className={`row`}>
            <div className={`col-12 col-md-9`}>
              <Main blogData={blogData}/>
            </div>
            <div className={`col-12 col-md-3`}>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default BlogCategory
