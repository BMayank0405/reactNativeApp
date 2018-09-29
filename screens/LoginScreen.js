import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Login } from '../action/LoginAction';
import { Container, Content, Text, Spinner, Title, Button, Left, Right, Body, Icon, Toast } from 'native-base';
import MySpinner from '../components/MySpinner'
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
		const user = await this.props.Login();
		if (Object.keys(user).length > 1) {
			try {
				const result = await fetch('https://pocappserver.herokuapp.com/user', {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({
						name: user.name,
						photoUrl: user.photo,
						email: user.email
					})

				})

				console.log(result);
				this.setState({
					isLoading: false
				})
				this.props.navigation.navigate(Object.keys(this.props.userDtl.userDetail || {}).length > 0 ? 'App' : 'Login')
			}
			catch (err) { }

		}

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
					<Header>
						<Body>
							<Title style={styles.header}>POC APP</Title>
						</Body>
					</Header>
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
		userDtl: state.user
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

export default connect(mapStateToProps, { Login })(LoginScreen);