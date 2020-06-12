import { Range } from "rc-slider"
import React, { useEffect, useState } from "react"
import * as helper from "../../lib/helper"
import { text } from "../../lib/settings"

const PriceSlider = props => {
  const [minValue, setMinValue] = useState(
    props.minValue > 0 ? props.minValue : props.minPrice
  )
  const [maxValue, setMaxValue] = useState(
    props.maxValue > 0 ? props.maxValue : props.maxPrice
  )

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      if (
        nextProps.minPrice !== props.minPrice ||
        nextProps.maxPrice !== props.maxPrice
      ) {
        setMinValue(nextProps.minPrice)
        setMaxValue(nextProps.maxPrice)
      }
    },
    [props]
  )

  const setValues = (values: { 0: number; 1: number }) => {
    if (Array.isArray(values) && values.length === 2) {
      setMinValue(values[0])
      setMaxValue(values[1])
    }
  }

  const { minPrice, maxPrice, setPriceFromAndTo, settings } = props

  return (
    <div className="price-filter">
      <div className="attribute-title">{text.price}</div>
      <Range
        min={minPrice}
        max={maxPrice}
        value={[minValue, maxValue]}
        disabled={maxPrice === 0}
        className="price-filter-range"
        onAfterChange={values => {
          setPriceFromAndTo(...values)
        }}
        onChange={setValues}
      />
      <div className="columns is-mobile is-gapless price-filter-values">
        <div className="column has-text-left">
          {helper.formatCurrency(minValue, settings)}
        </div>
        <div className="column has-text-right">
          {helper.formatCurrency(maxValue, settings)}
        </div>
      </div>
    </div>
  )
}

export default PriceSlider
