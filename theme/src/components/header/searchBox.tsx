import React, { useState } from "react"
import { text, themeSettings } from "../../lib/settings"

const SearchBox = props => {
  const [value, setValue] = useState(props.value)
  const [hasFocus, setHasFocus] = useState(false)

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleSearch()
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      handleClear()
    }
  }

  const handleSearch = () => {
    props.onSearch(value)
  }

  const handleClear = () => {
    setValue("")
    props.onSearch("")
  }

  const handleFocus = () => {
    setHasFocus(true)
  }

  const handleBlur = () => {
    setHasFocus(false)
  }

  const placeholderText =
    themeSettings.search_placeholder &&
    themeSettings.search_placeholder.length > 0
      ? themeSettings.search_placeholder
      : text.searchPlaceholder

  return (
    <div
      className={`search-box ${props.className}${hasFocus ? " has-focus" : ""}`}
    >
      <input
        className="search-input"
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <img
        className="search-icon-search"
        src="/assets/images/search.svg"
        alt={text.search}
        title={text.search}
        onClick={handleSearch}
      />
      {value && value !== "" && (
        <img
          className="search-icon-clear"
          src="/assets/images/close.svg"
          onClick={handleClear}
        />
      )}
    </div>
  )
}

export default SearchBox
