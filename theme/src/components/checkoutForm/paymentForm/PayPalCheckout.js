import React from 'react';

export default class PayPalButton extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { formSettings } = this.props;

		const script = document.createElement('script');
		//to test sandbox, just use 'sb' as client-id, client-id can be set at admin setting portal
		//sandbox can only use USD. other currency won't work on sandbox, but production is ok.
		script.src =
			'https://www.paypal.com/sdk/js?client-id=' +
			formSettings.client +
			'&currency=' +
			formSettings.currency;

		script.async = true;
		script.onload = () => {
			this.executeScript();
		};
		document.body.appendChild(script);
	}

	executeScript = () => {
		const { formSettings, onPayment } = this.props;
		const { amount, currency, order_id } = formSettings;

		paypal
			.Buttons({
				style: {
					label: 'pay',
					size: formSettings.size,
					shape: formSettings.shape,
					color: formSettings.color
				},
				createOrder(data, actions) {
					return actions.order.create({
						purchase_units: [
							{
								custom_id: order_id,
								amount: {
									value: amount,
									currency_code: currency
								}
							}
						]
					});
				},
				onApprove(data, actions) {
					return actions.order.capture().then(function(details) {
						// Show a success message to your buyer
						onPayment();
					});
				}
			})
			.render('#paypal-button-container');
	};

	render() {
		return (
			<div>
				<div id="paypal-button-container" />
			</div>
		);
	}
}
