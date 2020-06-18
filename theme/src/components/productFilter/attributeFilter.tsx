import React, { useEffect, useState } from "react"

const AttributeValue = props => {
  const [checked, setChecked] = useState(props.checked)

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      if (nextProps.checked !== props.checked) {
        setChecked(nextProps.checked)
      }
    },
    [nextProps]
  )

  const onChange = event => {
    const {
      attributeName,
      valueName,
      setFilterAttribute,
      unsetFilterAttribute,
    } = props
    const { checked } = event.target

    setChecked

    if (checked) {
      setFilterAttribute(attributeName, valueName)
    } else {
      unsetFilterAttribute(attributeName, valueName)
    }
  }

  const { valueName, count } = props
  const isDisabled = count === 0
  const classChecked = checked ? "attribute-checked" : ""
  const classDisabled = isDisabled ? "attribute-disabled" : ""

  return (
    <label className={`${classChecked} ${classDisabled}`}>
      <input
        type="checkbox"
        disabled={isDisabled}
        onChange={onChange}
        checked={checked}
      />
      {valueName} ({count})
    </label>
  )
}

const AttributeSet = ({
  attribute,
  setFilterAttribute,
  unsetFilterAttribute,
}) => {
  const values = attribute.values.map((value, index) => (
    <AttributeValue
      key={index}
      attributeName={attribute.name}
      valueName={value.name}
      checked={value.checked}
      count={value.count}
      setFilterAttribute={setFilterAttribute}
      unsetFilterAttribute={unsetFilterAttribute}
    />
  ))

  return (
    <div className="attribute">
      <div className="attribute-title">{attribute.name}</div>
      {values}
    </div>
  )
}

const AttributeFilter = ({
  attributes,
  setFilterAttribute,
  unsetFilterAttribute,
}) => {
  const attributeSets = attributes.map((attribute, index) => (
    <AttributeSet
      key={index}
      attribute={attribute}
      setFilterAttribute={setFilterAttribute}
      unsetFilterAttribute={unsetFilterAttribute}
    />
  ))

  return <div className="attribute-filter">{attributeSets}</div>
}

export default AttributeFilter
