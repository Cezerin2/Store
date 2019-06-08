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

export default class Login extends React.PureComponent {
	render() {
		const { customerProperties, onClick } = this.props;

		return (
			<span className="login-button" onClick={onClick}>
				{!customerProperties ? (
					<LoginIcon />
				) : (
					<span>
						<p className="login-name">
							{customerProperties.customer_settings.full_name}
						</p>
					</span>
				)}
			</span>
		);
	}
}
