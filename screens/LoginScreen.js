import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux';
import { Login } from '../action/LoginAction';
import { Container, Content, Text, Spinner, Title, Button, Left, Right, Body, Icon, Toast } from 'native-base';
import { Logout } from '../action/LogoutAction';

import MySpinner from '../components/MySpinner'
import MyHeader from "../components/MyHeader";
class LoginScreen extends Component {

	constructor(props) {
		super(props)
		this.state = { isLoading: true }
	}
	async componentWillMount() {

		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
		this.setState({
			isLoading: false
		})
	}

	async _logincheck() {
		this.setState({
			isLoading: true
		})

		try {
			const result = await Expo.Google.logInAsync({
				androidClientId: '117306357056-vejioaduaf6s3b4qavcqb8jerdj5659c.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});
			if (result.type === 'success') {

				const Authuser = {
					name: result.user.name,
					photoUrl: result.user.photoUrl,
					email: result.user.email
				}
				const data = JSON.stringify(Authuser)
				try {
					const result = await fetch('https://pocappserver.herokuapp.com/userss', {
						method: "POST",
						mode: 'cors',
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},
						body: data

					})
					console.log(result)
					if (result.ok) {
						try {
							await this.props.Login(Authuser)
							this.setState({
								isLoading: false
							})
							this.props.navigation.navigate('App')
						}
						catch (err) {
							console.log("login", err)
							this.setState({
								isLoading: false
							})
							await this.props.Logout()
						}
					}
					else {
						Alert.alert('Error', result.statusText)
						this.setState({
							isLoading: false
						})
						await this.props.Logout()
					}


				}
				catch (err) {
					console.log("fetch")
					Alert.alert('Error', 'Fetch error')
					this.setState({
						isLoading: false
					})
					await this.props.Logout()
				}

			} else {
				console.log('cancelled');
				Alert.alert('Error', 'You canceled authentication process')
				this.setState({
					isLoading: false
				})
			}
		} catch (e) {
			console.log(`error: ${e}`);
			Alert.alert('Error', e)
			this.setState({
				isLoading: false
			})
		}
		// const user = await this.props.Login();




	}


	render() {
		if (this.state.isLoading) {
			return (
				<MySpinner />
			)
		}
		else {
			return (
				<Container >
					<MyHeader />
					<Container style={styles.container}>
						<Content></Content>
						<Content padder>
							<Text style={styles.header}>Sign in with Google</Text>
							<Button style={styles.button} rounded onPress={() => this._logincheck()} >
								<Icon name="logo-googleplus" />
								<Text>Sign in</Text>
							</Button>
						</Content>
						<Content></Content>
					</Container>
				</Container>
			)
		}

	}
}

Login.propTypes = {
	Login: PropTypes.func.isRequired,
	userDtl: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return ({
		userDtl: state.user.userDetail
	})
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	header: {
		alignSelf: 'center',
		fontSize: 22
	},
	button: {
		alignSelf: 'center',
		marginTop: 7

	},
	image: {
		marginTop: 15,
		width: 150,
		height: 150,
		borderColor: "rgba(0,0,0,0.2)",
		borderWidth: 3,
		borderRadius: 150
	}
})

export default connect(mapStateToProps, { Login, Logout })(LoginScreen);