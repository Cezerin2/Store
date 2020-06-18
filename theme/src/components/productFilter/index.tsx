import React, { useState } from "react"
import { text } from "../../lib/settings"
import Sort from "../sort"
import AttributeFilter from "./attributeFilter"
import PriceSlider from "./priceSlider"

const ProductFilter = props => {
  const [sidebarIsActive, setSidebarIsActive] = useState(false)

  const sidebarToggle = () => {
    setSidebarIsActive(!sidebarIsActive)
    document.body.classList.toggle("noscroll")
  }

  const sidebarClose = () => {
    setSidebarIsActive(false)
    document.body.classList.remove("noscroll")
  }

  const {
    settings,
    productFilter,
    productsMinPrice,
    productsMaxPrice,
    productsAttributes,
  } = props.state

  return (
    <>
      <div className="is-hidden-tablet">
        <button className="button is-fullwidth" onClick={sidebarToggle}>
          {text.filterProducts}
        </button>
      </div>

      <div
        className={sidebarIsActive ? "modal is-active" : "is-hidden-mobile"}
        style={{ zIndex: 101 }}
      >
        <div
          className={sidebarIsActive ? "dark-overflow" : ""}
          onClick={sidebarClose}
        />
        <div className={sidebarIsActive ? "modal-content" : ""}>
          <div className={sidebarIsActive ? "box sidebar" : ""}>
            <div className="is-hidden-tablet" style={{ marginBottom: 30 }}>
              <Sort
                defaultSort={settings.default_product_sorting}
                currentSort={productFilter.sort}
                setSort={props.setSort}
              />
            </div>

            <AttributeFilter
              attributes={productsAttributes}
              setFilterAttribute={props.setFilterAttribute}
              unsetFilterAttribute={props.unsetFilterAttribute}
            />

            <PriceSlider
              minPrice={productsMinPrice}
              maxPrice={productsMaxPrice}
              minValue={productFilter.priceFrom}
              maxValue={productFilter.priceTo}
              setPriceFromAndTo={props.setPriceFromAndTo}
              settings={settings}
            />

            <button
              className="button is-fullwidth is-dark is-hidden-tablet"
              onClick={sidebarClose}
            >
              {text.close}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductFilter
