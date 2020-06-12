import React, { useEffect, useState } from "react"
import { text } from "../../lib/settings"

const DiscountCountdown = props => {
  const [timer, setTimer] = useState(null)
  const [diff, setDiff] = useState(null)

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    setTimer
  }, [])

  //componentWillUnmount() {
  useEffect(() => {
    return () => clearInterval(timer)
  }, [])

  const tick = () => {
    const dateNow = new Date()
    const dateTo = new Date(props.product.date_sale_to)
    const diff = Math.abs(
      Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000)
    )
    setDiff
  }

  const pad = num => (num < 10 ? `0${num}` : num)

  const { product } = props

  if (product) {
    const days = Math.floor(diff / (24 * 60 * 60))
    let leftSec = diff - days * 24 * 60 * 60

    const hrs = Math.floor(leftSec / (60 * 60))
    leftSec -= hrs * 60 * 60

    const min = Math.floor(leftSec / 60)
    leftSec -= min * 60

    return (
      <div className="discount-countdown">
        <div className="discount-title">{text.saleEnds}:</div>

        <div
          className="columns is-mobile has-text-centered discount-numbers is-gapless"
          style={{ margin: "8px 0" }}
        >
          <div className="column is-2">{pad(days)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(hrs)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(min)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(leftSec)}</div>
        </div>

        <div className="columns is-mobile has-text-centered discount-labels is-gapless">
          <div className="column is-2">{text.days}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.hours}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.minutes}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.seconds}</div>
        </div>
      </div>
    )
  }
  return null
}

export default DiscountCountdown
