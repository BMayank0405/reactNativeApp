import React, { Component } from "react";
import { connect } from "react-redux";
import { Font } from "expo"
import MySpinner from '../components/MySpinner'

class AuthLoadingScreen extends Component {

	constructor(props) {
		super(props)
		// this.props.navigation.navigate(Object.keys(this.props.userDtl.userDetail || {}).length > 0 ? 'App' : 'Login')

	}
	async componentWillMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
		});
		this.props.navigation.navigate('Check')
	}
	render() {
		return (
			<MySpinner />
		);
	}
}

const mapStateToProps = state => ({
	userDtl: state.user
})
export default connect(mapStateToProps)(AuthLoadingScreen);