import { Link } from "@reach/router"
import React from "react"

const pad = number => (number < 10 ? `0${number}` : number)
const formatDate = date =>
  `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`

const PageListItem = ({ page }) => (
  <div className="page-item">
    <h2>
      <Link to={page.path}>{page.meta_title}</Link>
    </h2>
    <div className="date">{formatDate(new Date(page.date_created))}</div>
    <div className="description">{page.meta_description}</div>
  </div>
)

export default PageListItem
