import * as React from "react"
import { graphql} from "gatsby"

import Seo from "../components/seo"

const IndexPage = () => {
 
  return (
    <>
      <Seo title={`title`} description={`description`} />
     <div>Homepage</div>
    </>
  )
}

export default IndexPage