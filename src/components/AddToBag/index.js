import React, { useContext } from "react"

import { StoreContext } from "~/provider"

const AddToBag = ({ variant }) => {
  const { addVariantToCart } = useContext(StoreContext),
    handleAddToCart = () => {
      addVariantToCart(variant.id, 1).then(() => {
        // Toggle Flying Cart
        document.querySelector(".toggle-cart").click()
      })
    }

  return (
    <div className={"add-to-bag text-center mt-3"}>
      <button
        type={"button"}
        onClick={handleAddToCart}
        className={"btn btn-primary"}
      >
        ADD TO BAG
      </button>
    </div>
  )
}

export default AddToBag
