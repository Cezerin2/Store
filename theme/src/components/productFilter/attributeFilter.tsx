import React,{useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const AttributeValue = () => {
		this.state = {
			checked: props.checked
		};

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	onChange = event => {
		const {
			attributeName,
			valueName,
			setFilterAttribute,
			unsetFilterAttribute
		} = this.props;
		const { checked } = event.target;

		this.setState({ checked });

		if (checked) {
			setFilterAttribute(attributeName, valueName);
		} else {
			unsetFilterAttribute(attributeName, valueName);
		}
	};

		const { valueName, count } = this.props;
		const isDisabled = count === 0;
		const classChecked = this.state.checked ? 'attribute-checked' : '';
		const classDisabled = isDisabled ? 'attribute-disabled' : '';

		return (
			<label className={`${classChecked} ${classDisabled}`}>
				<input
					type="checkbox"
					disabled={isDisabled}
					onChange={this.onChange}
					checked={this.state.checked}
				/>
				{valueName} ({count})
			</label>
		);
	}

const AttributeSet = ({
	attribute,
	setFilterAttribute,
	unsetFilterAttribute
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
	));

	return (
		<div className="attribute">
			<div className="attribute-title">{attribute.name}</div>
			{values}
		</div>
	);
};

const AttributeFilter = ({
	attributes,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
	const attributeSets = attributes.map((attribute, index) => (
		<AttributeSet
			key={index}
			attribute={attribute}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return <div className="attribute-filter">{attributeSets}</div>;
};

export default AttributeFilter;