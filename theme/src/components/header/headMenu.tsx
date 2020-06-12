import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { themeSettings } from "../../lib/settings"

const HeadMenuItem = props => {
  const [isActive, setIsActive] = useState(false)

  const onMouseEnterHandler = () => {
    if (!props.isMobile && props.level === 1) {
      setIsActive(true)
    }
  }

  const onMouseLeaveHandler = () => {
    if (!props.isMobile && props.level === 1) {
      setIsActive(false)
    }
  }

  const isActiveToggle = () => setIsActive(!isActive)

  const { categories, category, onClick, level, isMobile } = props
  const items = categories
    .filter(item => item.parent_id === category.id)
    .map((subcategory, index) => (
      <HeadMenuItem
        key={index}
        category={subcategory}
        onClick={onClick}
        categories={categories}
        level={level + 1}
        isMobile={isMobile}
      />
    ))
  const hasItems = items.length > 0

  return (
    <li
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseUp={onMouseLeaveHandler}
      className={
        (level === 2 ? "column is-3" : "") +
        (isActive ? " is-active" : "") +
        (hasItems ? " has-items" : "")
      }
    >
      <div className="cat-parent">
        <NavLink
          activeClassName="is-active"
          className={hasItems ? "has-items" : ""}
          to={category.path}
          onClick={onClick}
        >
          {category.name}
        </NavLink>
        {hasItems && isMobile && <span onClick={isActiveToggle} />}
      </div>
      {hasItems && (
        <ul
          className={`${
            level === 1 ? "columns is-gapless is-multiline" : ""
          } nav-level-${level}`}
        >
          {items}
        </ul>
      )}
    </li>
  )
}

const HeadMenu = props => {
  const { categories, onClick, isMobile } = props
  let addItemsToMenu = []
  if (themeSettings.header_menu && themeSettings.header_menu.length > 0) {
    addItemsToMenu = themeSettings.header_menu.map(item => ({
      name: item.text,
      path: item.url,
      id: item.id || "",
      parent_id: item.parent_id || null,
    }))
  }
  const menuItems = [...categories, ...addItemsToMenu]

  const items = menuItems
    .filter(category => category.parent_id === null)
    .map((category, index) => (
      <HeadMenuItem
        key={index}
        category={category}
        onClick={onClick}
        categories={categories}
        level={1}
        isMobile={isMobile}
      />
    ))

  return <ul className="nav-level-0">{items}</ul>
}

export default HeadMenu
