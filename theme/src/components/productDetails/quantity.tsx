import React, { useEffect, useState } from "react"
import { text } from "../../lib/settings"

const Quantity = props => {
  const [quantity, setQuantity] = useState(1)

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      if (quantity > nextProps.maxQuantity) {
        setQuantity(nextProps.maxQuantity)
      }
    },
    [props]
  )

  const handleChange = event => {
    setQuantity(event.target.value)
  }

  const setQuantitys = quantity => {
    const intQuantity = parseInt(quantity)
    if (intQuantity > 0 && intQuantity <= props.maxQuantity) {
      setQuantity(intQuantity)
      props.onChange(intQuantity)
    }
  }

  const increment = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
  }

  const decrement = () => {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
  }

  const { maxQuantity } = props
  const disabled = maxQuantity === 0
  const value = disabled ? 0 : quantity

  return (
    <>
      <>{text.qty}</>
      <div className="product-quantity">
        <a className="decrement" onClick={decrement} />
        <input
          value={value}
          onChange={handleChange}
          maxLength="3"
          type="number"
          pattern="\d*"
          disabled={disabled}
        />
        <a className="increment" onClick={increment} />
      </div>
    </>
  )
}

export default Quantity
