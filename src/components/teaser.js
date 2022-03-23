import * as React from "react"
const Teaser = ({blok})=>(
    
    <div className="banner">
        <div>
            <h2>
                {blok.banner_title}
            </h2>
            <p>
                {blok.banner_subtitle}
            </p>
            <a href={blok.banner_btn_link}>{blok.banner_btn_text}</a>
            <img className={`banner-image`} src={blok.banner_image} alt="" />
        </div>
    </div>
)

export default Teaser