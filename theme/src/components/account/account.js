import React from 'react';
import api from '../../../dist/lib/api';
import { Redirect, Link } from 'react-router-dom';
import Lscache from 'lscache';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';

const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};

const InputField = field => (
	<div className={field.className}>
		<label htmlFor={field.id}>
			{field.label}
			{field.meta.touched &&
				field.meta.error && <span className="error">{field.meta.error}</span>}
		</label>
		<input
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
			id={field.id}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
	</div>
);

class Account extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profileSection: 1,
			profileEdit: false,
			reinitialized: false,
			cartLayer: false
		}
	}

	setInitialValues() {
		this.props.initialize({
			first_name: this.props.customerProperties.customer_settings.first_name,
			last_name: this.props.customerProperties.customer_settings.last_name,
			email: this.props.customerProperties.customer_settings.email,
			password: this.props.customerProperties.customer_settings.password,
			shipping_address: {
				address1: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.address1 : '',
				address2: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.address2 : '',
				city: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.city : '',
				postal_code: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.postal_code : '',
				state: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.state : '',
				country: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].shipping_address.country : ''
			}, billing_address: {
				address1: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.address1 : '',
				address2: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.address2 : '',
				city: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.city : '',
				postal_code: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.postal_code : '',
				state: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.state : '',
				country: this.props.customerProperties.order_statuses.data.length > 0 ? this.props.customerProperties.order_statuses.data[this.props.customerProperties.order_statuses.data.length - 1].billing_address.country : ''
			}
		});
		this.setState({ reinitialized: true });
		this.setState({ emailValues: this.props.customerProperties.customer_settings.email });
	}

	getField = fieldName => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find(item => item.name === fieldName);
		return field;
	};

	getFieldStatus = fieldName => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = fieldName => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	isFieldHidden = fieldName => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}

		return validatorsArray;
	};

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	getFieldLabelText = fieldName => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'first_name':
					return text.first_name;
					break;
				case 'last_name':
					return text.last_name;
					break;
				case 'email':
					return text.email;
					break;
				case 'mobile':
					return text.mobile;
					break;
				case 'password':
					return text.password;
					break;
				case 'password_verify':
					return text.password_verify;
					break;
				case 'address1':
					return text.address1;
					break;
				case 'address2':
					return text.address2;
					break;
				case 'country':
					return text.country;
					break;
				case 'state':
					return text.state;
					break;
				case 'city':
					return text.city;
					break;
				case 'postal_code':
					return text.postal_code;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	getFieldLabel = fieldName => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};

	handleProfile = () => {
		this.setState({ profileSection: 1,  profileEdit: false });
	}

	handleOrderHistory = () => {
		this.setState({ profileSection: 2 });
	}

	handleLogout() {
		Lscache.flush();
	}

	handleContactsEdit = () => {
		this.setState({ profileEdit: true });
	};

	render() {
		const { handleSubmit,
				customerProperties,
				cartlayerBtnInitialized,
				cart,
				initialValues
		} = this.props;

		Lscache.flushExpired();
		
		const accountInputField = 'account-field';
		const accountForm = 'account-form';
		const titleClassName = 'login-title';
		const accountEditButtonClass = 'account-button button';
		const accountHeaderMenueContainer = 'account-header-menue-container';
		const accountHeaderMenueItems = 'account-header-menue-items';
		const accountProfileContainer = 'account-profile-container';
		const accountProfileList = 'account-profile-list';
		const accountButtonContainer = 'account-button-container';
		const continueShoppingButton = 'continue-shopping-button account-button button';
		const accountProfileHeadline = 'account-profile-headline';
		const isActive = 'is-active';

		let billingAddress = {};
		let shippingAddress = {};
		let orderHistory = {};
		const list = [];
		let tableStyle = null;
		let keyCounter = 0;
		let listHeader = [];

		if (this.props.customerProperties === undefined || Lscache.get('auth_data') === null) {
			return (
			  	<Redirect to={{
					pathname: '/login'
				}}/>
			);
		}

		if (this.props.customerProperties !== undefined && this.props.customerProperties.cartLayer && Lscache.get('auth_data') !== null) {
			return (
				<Redirect to={{
					pathname: '/checkout'
				}}/>
			);
		}
		
		if (this.props.customerProperties !== undefined && this.props.customerProperties.order_statuses !== null) {
			if('data' in this.props.customerProperties.order_statuses) {
				billingAddress = this.props.customerProperties.order_statuses.data.filter(obj => obj.draft !== true).reduce(function(map, obj) {
					map['address1'] = obj.billing_address.address1;
					map['address2'] = obj.billing_address.address2;
					map['city'] = obj.billing_address.city;
					map['postal_code'] = obj.billing_address.postal_code;
					map['state'] = obj.billing_address.state;
					map['country'] = obj.billing_address.country;
					return map;
				}, {});

				shippingAddress = this.props.customerProperties.order_statuses.data.filter(obj => obj.draft !== true).reduce(function(map, obj) {
					map['address1'] = obj.shipping_address.address1;
					map['address2'] = obj.shipping_address.address2;
					map['city'] = obj.shipping_address.city;
					map['postal_code'] = obj.shipping_address.postal_code;
					map['state'] = obj.shipping_address.state;
					map['country'] = obj.shipping_address.country;
					return map;
				}, {});

				orderHistory = this.props.customerProperties.order_statuses.data.filter(obj => obj.draft !== true).reduce(function(map, obj, i) {
					map['ordered_items' + i] = obj.items;
					return map;
				}, {});
			}

			// get all orders
			keyCounter = 0;
			for(var i in orderHistory) {
				listHeader = orderHistory[i].map((p, j) =>{
					return (
						<tr className="tr-header" key={keyCounter}>
							{Object.keys(p).map((k, l) => {
								return (
									<th className="td-header" key={keyCounter+l}>
										{k}
									</th>
								);
							})}
						</tr>
					);
				});
				keyCounter++;
			};
			for(var i in orderHistory) {
				list.push(orderHistory[i].map(p => {
					return (
						<tr className="tr-body" key={p.id+''+i}>
							{Object.keys(p).map(k => {
								return (
									<td className="td-body" key={p.id+''+k}>
										<div suppressContentEditableWarning="true" contentEditable="false" value={k}>
											{p[k]}
										</div>
									</td>
								);
							})}
						</tr>
					);
				}));
			};

			if (this.state.profileEdit && !this.state.reinitialized ) {
				this.setInitialValues();
			}

			tableStyle = {
				align: 'center'
			};

			return (
				<div className="account-container">
					<div className="account-section">
						<h2 className={titleClassName}>
							{text.welcome} {customerProperties.customer_settings.full_name}
						</h2>
					</div>
					<div className={accountHeaderMenueContainer}>
						<ul className={accountHeaderMenueItems}>
							<li className={this.state.profileSection === 1 ? isActive : ''} onClick={this.handleProfile}>
								{text.profile}
							</li>
							<li className={this.state.profileSection === 2 ? isActive : ''} onClick={this.handleOrderHistory}>
								{text.orders}
							</li>
							<li>
								<Link to="/" style={{textDecoration:'none'}} key={'logout'} onClick={this.handleLogout}>{text.logout}</Link>
							</li>
						</ul>
					</div>
					{this.state.profileSection === 1 && !this.state.profileEdit && <div className={accountProfileContainer}>
						<div className={accountProfileList}>
							<div className={accountProfileHeadline}>
								<img
									src="/assets/images/icons/person.svg"
									alt="person-icon"
									className="person-icon"
									style={{ width: 25, height: 20 }}
								/>
								<h4>{text.account_profile_headline}</h4>
							</div>
							<ReadOnlyField
								name={text.member_since}
								value={new Date(customerProperties.customer_settings.date_created).toLocaleDateString("de-DE")}
							/>
							<ReadOnlyField
								name={text.first_name}
								value={customerProperties.customer_settings.first_name}
							/>
							<ReadOnlyField
								name={text.last_name}
								value={customerProperties.customer_settings.last_name}
							/>
							<ReadOnlyField
								name={text.email}
								value={customerProperties.customer_settings.email}
							/>
						</div>
						<div className={accountProfileList}>
							<div className={accountProfileHeadline}>
								<img
									src="/assets/images/icons/address.svg"
									alt="person-icon"
									className="person-icon"
									style={{ width: 25, height: 20 }}
								/>
								<h4>{text.account_billing_headline}</h4>
							</div>
							{Object.keys(billingAddress).length > 0 && (<ReadOnlyField
								name={text.address1}
								value={billingAddress.address1}
							/>)}
							{Object.keys(billingAddress).length > 0 && (<ReadOnlyField
								name={text.address2}
								value={billingAddress.address2}
							/>)}
							{Object.keys(billingAddress).length > 0 && (<ReadOnlyField
								name={text.city}
								value={billingAddress.city}
							/>)}
							{Object.keys(billingAddress).length > 0 && (<ReadOnlyField
								name={text.postal_code}
								value={billingAddress.postal_code}
							/>)}
							{Object.keys(billingAddress).length > 0 && (<ReadOnlyField
								name={text.state}
								value={billingAddress.state}
							/>)}
							<p>{Object.keys(billingAddress).length === 0 ? text.empty : ''}</p>
						</div>
						<div className={accountProfileList}>
							<div className={accountProfileHeadline}>
								<img
									src="/assets/images/icons/bag.svg"
									alt="person-icon"
									className="person-icon"
									style={{ width: 25, height: 20 }}
								/>
								<h4>{text.shippingAddress}</h4>
							</div>
							{Object.keys(shippingAddress).length > 0 && (<ReadOnlyField
								name={text.address1}
								value={shippingAddress.address1}
							/>)}
							{Object.keys(shippingAddress).length > 0 && (<ReadOnlyField
								name={text.address2}
								value={shippingAddress.address2}
							/>)}
							{Object.keys(shippingAddress).length > 0 && (<ReadOnlyField
								name={text.city}
								value={shippingAddress.city}
							/>)}
							{Object.keys(shippingAddress).length > 0 && (<ReadOnlyField
								name={text.postal_code}
								value={shippingAddress.postal_code}
							/>)}
							{Object.keys(shippingAddress).length > 0 && (<ReadOnlyField
								name={text.state}
								value={shippingAddress.state}
							/>)}
							<p>{Object.keys(shippingAddress).length === 0 ? text.empty : ''}</p>
						</div>
					</div>}
					{this.state.profileSection === 1 && this.state.profileEdit && <div className={accountProfileContainer}>						
						<form onSubmit={handleSubmit} className={accountForm}>
							<h3 className={titleClassName}>
								{text.edit_profile}
							</h3>
							<Field
								className={accountInputField}
								name="first_name"
								id="customer.first_name"
								autoComplete="new-password"
								component={InputField}
								type="text"
								label={this.getFieldLabel('first_name')}
								validate={this.getFieldValidators('first_name')}
								placeholder={this.getFieldPlaceholder('first_name')}
							/>
							<Field
								className={accountInputField}
								name="last_name"
								id="customer.last_name"
								autoComplete="new-password"
								component={InputField}						
								type="text"
								label={this.getFieldLabel('last_name')}
								validate={this.getFieldValidators('last_name')}
								placeholder={this.getFieldPlaceholder('last_name')}
							/>
							<Field
								className={accountInputField}
								name="email"
								id="customer.email"
								autoComplete="new-password"
								component={InputField} //this.state.loggedin
								type="email"
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>

							<Field
								className={accountInputField}
								name="password"
								id="customer.password"
								autoComplete="new-password"
								component={InputField}
								type="password"
								label={this.getFieldLabel('password')}
								validate={this.getFieldValidators('password')}
								placeholder={this.getFieldPlaceholder('password')}
							/>
	
							<Field
								className={accountInputField}
								name="password_verify"
								id="customer.password_verify"
								autoComplete="new-password"
								component={InputField}
								type="password"
								label={this.getFieldLabel('password_verify')}
								validate={this.getFieldValidators('password_verify')}
								placeholder={this.getFieldPlaceholder('password_verify')}
							/>
							<h3 className={titleClassName}>
								{text.shippingAddress}
							</h3>
							<Field
								className={accountInputField}
								name="shipping_address.address1"
								id="shipping_address.address1"
								component={InputField}
								type="text"
								label={this.getFieldLabel('address1')}
								validate={this.getFieldValidators('address1')}
								placeholder={this.getFieldPlaceholder('address1')}
							/>
							<Field
								className={accountInputField}
								name="shipping_address.address2"
								id="shipping_address.address2"
								component={InputField}
								type="text"
								label={this.getFieldLabel('address2')}
								placeholder={this.getFieldPlaceholder('address2')}
							/>
							<Field
								className={accountInputField}
								name="shipping_address.country"
								id="shipping_address.country"
								component={InputField}
								type="text"
								label={this.getFieldLabel('country')}
								validate={this.getFieldValidators('country')}
								placeholder={this.getFieldPlaceholder('country')}
							/>

							<Field
								className={accountInputField}
								name="shipping_address.state"
								id="shipping_address.state"
								component={InputField}
								type="text"
								label={this.getFieldLabel('state')}
								validate={this.getFieldValidators('state')}
								placeholder={this.getFieldPlaceholder('state')}
							/>

							<Field
								className={accountInputField}
								name="shipping_address.postal_code"
								id="shipping_address.postal_code"
								component={InputField}
								type="text"
								label={this.getFieldLabel('postal_code')}
								validate={this.getFieldValidators('postal_code')}
								placeholder={this.getFieldPlaceholder('postal_code')}
							/>

							<Field
								className={accountInputField}
								name="shipping_address.city"
								id="shipping_address.city"
								component={InputField}
								type="text"
								label={this.getFieldLabel('city')}
								validate={this.getFieldValidators('city')}
								placeholder={this.getFieldPlaceholder('city')}
							/>

							<h3 className={titleClassName}>
								{text.billingAddress}
							</h3>
							<Field
								className={accountInputField}
								name="billing_address.address1"
								id="billing_address.address1"
								component={InputField}
								type="text"
								label={this.getFieldLabel('address1')}
								validate={this.getFieldValidators('address1')}
								placeholder={this.getFieldPlaceholder('address1')}
							/>
							<Field
								className={accountInputField}
								name="billing_address.address2"
								id="billing_address.address2"
								component={InputField}
								type="text"
								label={this.getFieldLabel('address2')}
								placeholder={this.getFieldPlaceholder('address2')}
							/>
							<Field
								className={accountInputField}
								name="billing_address.country"
								id="billing_address.country"
								component={InputField}
								type="text"
								label={this.getFieldLabel('country')}
								validate={this.getFieldValidators('country')}
								placeholder={this.getFieldPlaceholder('country')}
							/>

							<Field
								className={accountInputField}
								name="billing_address.state"
								id="billing_address.state"
								component={InputField}
								type="text"
								label={this.getFieldLabel('state')}
								validate={this.getFieldValidators('state')}
								placeholder={this.getFieldPlaceholder('state')}
							/>

							<Field
								className={accountInputField}
								name="billing_address.postal_code"
								id="billing_address.postal_code"
								component={InputField}
								type="text"
								label={this.getFieldLabel('postal_code')}
								validate={this.getFieldValidators('postal_code')}
								placeholder={this.getFieldPlaceholder('postal_code')}
							/>

							<Field
								className={accountInputField}
								name="billing_address.city"
								id="billing_address.city"
								component={InputField}
								type="text"
								label={this.getFieldLabel('city')}
								validate={this.getFieldValidators('city')}
								placeholder={this.getFieldPlaceholder('city')}
							/>
	
							<div className="checkout-button-wrap">
								<button
									type="submit"
									//disabled={invalid}
									className={accountEditButtonClass}
								>
									{text.save}
								</button>
							</div>
						</form>
					</div>}
					{this.state.profileSection === 2 && <div className={accountProfileContainer}>
						<div className="spread-sheet-container">
							<fieldset className="orders-history-fieldset">
								<div className="heading">
									<h3>{text.order_history}</h3>
								</div>
								<div className="schedule padd-lr">
									<div className="tbl-header">
										<table cellPadding="0" cellSpacing="0" id="mytable" style={tableStyle}>
											<thead>{listHeader}</thead>
										</table>
									</div>
									<div className="tbl-content">
										<table cellPadding="0" cellSpacing="0" className={'orders-history-table'} style={tableStyle}>
											<tbody>{list}</tbody>
										</table>
									</div>
								</div>
							</fieldset>
						</div>
					</div>}
					<div className={accountButtonContainer}>
					{this.state.profileSection !== 2 && Object.keys(shippingAddress).length !== 0 && <button
							type="button"
							onClick={this.handleContactsEdit}
							className={accountEditButtonClass}
						>
							{text.edit}
						</button>}
						<button
							type="button"
							className={continueShoppingButton}
						>
							<Link  to="/" style={{textDecoration:'none'}} key={'account-continue-shopping'}>{text.continueshopping}</Link>
						</button>
					</div>
					<form onSubmit={handleSubmit} className="login-form">
						
					</form>
					
				</div>
			)
		}
	}
}
export default reduxForm({
	form: 'Account',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Account);
