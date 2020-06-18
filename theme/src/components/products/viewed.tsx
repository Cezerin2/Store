import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
import { text } from "../../lib/settings"
import CustomProductList from "./custom"

const ViewedProducts = props => {
  // static propTypes = {
  //   limit: PropTypes.number.isRequired,
  //   settings: PropTypes.shape({}).isRequired,
  //   addCartItem: PropTypes.func.isRequired,
  //   product: PropTypes.shape({}).isRequired,
  // }

  const [viewedProducts, setViewedProducts] = useState([])

  useEffect(() => {
    const { product } = props
    const viewedProducts = getArrayFromLocalStorage()
    setViewedProducts(viewedProducts)

    if (product && product.id) {
      addProductIdToLocalStorage(product.id)
    }
  }, [])

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      if (
        props.product !== nextProps.product &&
        nextProps.product &&
        nextProps.product.id
      ) {
        addProductIdToLocalStorage(nextProps.product.id)
      }
    },
    [props]
  )

  function shouldComponentUpdate(nextProps, nextState) {
    return viewedProducts !== nextState.viewedProducts
  }

  const getArrayFromLocalStorage = () => {
    let values = []
    const viewedProducts = localStorage.getItem("viewedProducts")

    try {
      if (viewedProducts && viewedProducts.length > 0) {
        const viewedProductsParsed = JSON.parse(viewedProducts)
        if (Array.isArray(viewedProductsParsed)) {
          values = viewedProductsParsed
        }
      }
    } catch (error) {
      console.error(error)
    }

    return values
  }

  const addProductIdToLocalStorage = productId => {
    if (productId && productId.length > 0) {
      const viewedProducts = getArrayFromLocalStorage()

      if (viewedProducts.includes(productId)) {
        const index = viewedProducts.indexOf(productId)
        viewedProducts.splice(index, 1)
        viewedProducts.push(productId)
      } else {
        viewedProducts.push(productId)
      }

      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts))
      setViewedProducts
    }
  }

  const { limit, settings, addCartItem, product } = props

  if (viewedProducts && product && product.id) {
    setViewedProducts(viewedProducts.filter(id => id !== product.id))
  }

  if (viewedProducts && viewedProducts.length > 0) {
    const ids = viewedProducts.reverse().slice(0, limit)
    return (
      <section className="section section-product-related">
        <div className="container">
          <div className="title is-4 has-text-centered">
            {text.recentlyViewed}
          </div>
          <CustomProductList
            ids={ids}
            settings={settings}
            addCartItem={addCartItem}
            limit={limit}
            isCentered
          />
        </div>
      </section>
    )
  }
  return null
}

export default ViewedProducts
