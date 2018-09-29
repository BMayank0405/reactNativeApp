import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Spinner,Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

class AuthLoadingScreen extends Component {

	constructor(props) {
		super(props)
		this.props.navigation.navigate(Object.keys(this.props.userDtl.userDetail || {}).length > 0 ? 'App' : 'Login')
	}

	render() {
		return (
			<Container>
			<Content>
					<Spinner />
			</Content>
		</Container>
		);
	}
}

const mapStateToProps = state => ({
	userDtl: state.user
})
export default connect(mapStateToProps)(AuthLoadingScreen);