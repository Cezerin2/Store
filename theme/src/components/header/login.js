import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import { Button, Menu, MenuItem } from '@material-ui/core/';
import { Link, NavLink } from 'react-router-dom';
import Lscache from 'lscache';

const LoginIcon = () => (
	<img
		id="login-icon"
		src="/assets/images/login.svg"
		className="login-icon"
		alt={text.login}
		title={text.login}
		style={{
			margin: `auto`,
			minWidth: `${32}px`,
			minHeight: `${29}px`,
			maxWidth: `${44}px`,
			maxHeight: `${28}px`
		}}
	/>
);

export default class Login extends React.Component {
	menuText = {
		login: 'Login',
		logout: 'Logout',
		account: 'Account',
		guest: 'Guest'
	};

	constructor(props) {
		super(props);
		this.state = {
			customerProperties: this.props.customerProperties || null,
			anchorEl: null
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.setAnchorEl = this.setAnchorEl.bind(this);
	}

	handleClick(event) {
		this.setAnchorEl(event.currentTarget);
	}

	handleClose() {
		this.setAnchorEl(null);
	}

	handleLogout() {
		Lscache.flush();
	}

	setAnchorEl(target) {
		this.setState({
			anchorEl: target || null
		});
	}

	componentWillReceiveProps(next, prev) {
		if (next.customerProperties !== this.props.customerProperties) {
			this.setState({ customerProperties: next.customerProperties });
		}
	}

	render() {
		const { onClick } = this.props;

		return (
			<span className="login-button">
				<p className="login-name">
					<Button
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={this.handleClick}
					>
						<LoginIcon />
					</Button>
					<Menu
						id="simple-menu"
						keepMounted
						anchorEl={this.state.anchorEl}
						open={Boolean(this.state.anchorEl)}
						onClose={this.handleClose}
					>
						<MenuItem disabled onClick={this.handleClose}>
							{this.state.customerProperties
								? this.state.customerProperties.customer_settings.full_name
								: this.menuText.guest}
						</MenuItem>
						{this.state.customerProperties ? (
							<MenuItem>
								<NavLink className="fluid-fit" to="/customer-account">
									{this.menuText.account}
								</NavLink>
							</MenuItem>
						) : (
							<MenuItem>
								<NavLink className="fluid-fit" to="/login">
									{this.menuText.login}
								</NavLink>
							</MenuItem>
						)}
						{this.state.customerProperties ? (
							<MenuItem>
								<Link
									className="fluid-fit no-decor"
									to="/"
									key="logout"
									onClick={this.handleLogout}
								>
									{this.menuText.logout}
								</Link>
							</MenuItem>
						) : null}
					</Menu>
				</p>
			</span>
		);
	}
}
