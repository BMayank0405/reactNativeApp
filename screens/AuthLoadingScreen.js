import React, { Component } from "react";
import { connect } from "react-redux";
import { Font } from "expo"
import MySpinner from '../components/MySpinner'
import { GetDetail } from '../action/GetDetailAction';
import { AsyncStorage } from 'react-native';


class AuthLoadingScreen extends Component {

	constructor(props) {
		super(props)



	}
	async componentWillMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
		});
		this._checkLogin()
	}

	//this function checks if user is present in redux state or in async storage then move to app screen else move to login screen
	async _checkLogin() {
		if (typeof this.props.userDtl != "undefined" && Object.keys(this.props.userDtl || {}).length > 0) {
			this.props.navigation.navigate('App')
		}
		else {
			const result = await AsyncStorage.getItem('userDetail')
			const user = JSON.parse(result);
			if (Object.keys(user || {}).length > 0) {
				await this.props.GetDetail(user)
				this.props.navigation.navigate('App')
			}
			else {
				this.props.navigation.navigate('Login')
			}
		}

	}


	render() {
		return (
			<MySpinner />
		);
	}
}

const mapStateToProps = state => ({
	userDtl: state.user.userDetail
})
export default connect(mapStateToProps, { GetDetail })(AuthLoadingScreen);