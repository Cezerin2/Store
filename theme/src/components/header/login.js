import React from 'react';
import { themeSettings, text } from '../../lib/settings';

const LoginIcon = () => {
	return (
		<img
			src="/assets/images/login.svg"
			className="login-icon"
			alt={text.login}
			title={text.login}
			style={{
				marginTop: 12 + 'px',
				minWidth: 32 + 'px',
				minHeight: 29 + 'px',
				maxWidth: 44 + 'px',
				maxHeight: 28 + 'px'
			}}
		/>
	);
};

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { customerProperties: this.props.customerProperties || null };
	}

	componentWillReceiveProps(next, prev) {
		if (next.customerProperties !== this.props.customerProperties) {
			this.setState({ customerProperties: next.customerProperties });
		}
	}

	render() {
		const { onClick } = this.props;

		return (
			<span className="login-button" onClick={onClick}>
				<p className="login-name">
					{this.state.customerProperties ? (
						this.state.customerProperties.customer_settings.full_name
					) : (
						<LoginIcon />
					)}
				</p>
			</span>
		);
	}
}
