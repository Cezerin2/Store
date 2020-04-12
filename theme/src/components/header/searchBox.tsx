import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../../lib/settings'

const SearchBox = () => {
	this.state = {
		value: props.value,
		hasFocus: false,
	}
	handleChange = (event) => {
		this.setState({ value: event.target.value })
	}

	handleKeyPress = (e) => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSearch()
		}
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 27) {
			this.handleClear()
		}
	}

	handleSearch = () => {
		this.props.onSearch(this.state.value)
	}

	handleClear = () => {
		this.setState({ value: '' })
		this.props.onSearch('')
	}

	handleFocus = () => {
		this.setState({ hasFocus: true })
	}

	handleBlur = () => {
		this.setState({ hasFocus: false })
	}

	const { hasFocus } = this.state
	const placeholderText =
		themeSettings.search_placeholder &&
		themeSettings.search_placeholder.length > 0
			? themeSettings.search_placeholder
			: text.searchPlaceholder

	return (
		<div
			className={`search-box ${this.props.className}${
				hasFocus ? ' has-focus' : ''
			}`}
		>
			<input
				className="search-input"
				type="text"
				placeholder={placeholderText}
				value={state.value}
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
			{state.value && state.value !== '' && (
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
