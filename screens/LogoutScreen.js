import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Logout } from '../action/LogoutAction';
import { Container, Content, Text, Spinner, Header, Title, Button, Left, Right, Body, Icon, Grid, Col } from 'native-base';
class LogoutScreen extends Component {

	constructor(props) {
		super(props)
		this.state = { isLoading: false }
	}
	async _logout() {
		this.setState({
			isLoading: true
		})
		await this.props.Logout();
		this.setState({
			isLoading: false
		})
		this.props.navigation.navigate('Login')
	}


	render() {

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
						<Text style={styles.header}>Do you really want to Logout?</Text>
						<Grid>
							<Col>
								<Button style={styles.button} onPress={() => this.props.navigation.navigate('Home')} >
									<Text>No</Text>
								</Button>
							</Col>
							<Col>
								<Button style={styles.button} onPress={() => this._logout()} >
									<Text>Yes</Text>
								</Button>
							</Col>
						</Grid>
					</Content>
					<Content></Content>
				</Container>
			</Container>
		)
	}
}

// Login.propTypes = {
// 	Login: PropTypes.func.isRequired,
// 	userDtl: PropTypes.object.isRequired
// };



const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	header: {
		alignSelf: 'center',
		fontSize: 22
	},
	button: {
		flex: 1,
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


export default connect(null, { Logout })(LogoutScreen);