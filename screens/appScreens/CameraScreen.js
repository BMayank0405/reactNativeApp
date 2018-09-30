import React, { Component } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground,
	Alert
} from "react-native";

import { Camera, FileSystem, Permissions } from 'expo';
import { Container, Content, Button, Text, Body, Grid, Spinner, Card, Icon, CardItem, Left, Footer, FooterTab, Right, Col } from 'native-base';
import { connect } from 'react-redux';

import { LastImage } from "../../action/LastImageAction";
import { ClearImage } from "../../action/ClearImageAction";
import { CamPermissionAction } from '../../action/CamPermissionAction'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MySpinner from "../../components/MySpinner";

import { withNavigationFocus } from 'react-navigation';

class CameraComponent extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		url: null,
		newPhoto: false,
		isloading: false,
		autoFocus: 'off'
	}

	async componentWillMount() {
		if (this.props.hasCameraPermission) this.setState({ hasCameraPermission: true })
		else {
			this.setState({
				isloading: true
			})
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			await this.props.CamPermissionAction(status);
			this.setState({
				hasCameraPermission: status === 'granted',
				isloading: false
			})
		}
	}


	//user defined functions
	_takePicture = async () => {
		try {

			const photo = await this.camera.takePictureAsync({
				quality: 0,
				base64: false,
				exif: false
			});
			await this.setState({
				url: photo.uri,
				newPhoto: true,
			})
		}
		catch (err) {
			Alert.alert('Error', 'Image Could not be clicked.Try again later.')
		}


	};
	_onPictureSaved = async photo => {
		//dispatch action
		await this.props.LastImage(photo.uri)

		await this.setState({
			url: photo.uri,
			newPhoto: true,
		})
	}

	// image upload to heroku server
	_uploadImage = async () => {
		this.setState({
			isloading: true,
			newPhoto: false
		})
		const data = new FormData();
		const timestamp = Date.now();
		data.append('timestamp', timestamp);
		data.append('email', this.props.userDtl.email)
		data.append('image', {
			uri: this.state.url,
			type: 'image/jpeg',
			name: 'IMG-' + timestamp + '.jpg'
		});
		try {
			const result = await fetch('https://pocappserver.herokuapp.com/savePhotos', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: data
			})
			if (result.ok) {
				this.setState({
					isloading: false,
					newPhoto: false
				})
				await this.props.ClearImage();
				Alert.alert('Success', 'Image has been Uploaded Successfully.')
			}
			else {
				this.setState({
					isloading: false,
					newPhoto: false
				})
				Alert.alert('Error', result.statusText)
			}

		}
		catch (err) {
			this.setState({
				isloading: false,
				newPhoto: false
			})
			Alert.alert('Error', 'There was some error.Please try again later.')
		}
	}


	_clearImage = async () => {
		this.setState({
			isloading: false,
			newPhoto: false
		})
		this.props.ClearImage()
	}
	//end of user defined functions


	render() {
		const { hasCameraPermission } = this.state

		if (hasCameraPermission === null) {
			return <View />
		}
		else if (hasCameraPermission === false) {
			return <Text> No access to camera</Text>
		}
		else if (this.state.isloading == true) {
			return <MySpinner />
		}
		else if (this.state.newPhoto == true) {
			return (
				<ImageBackground source={{ uri: this.state.url }} imageStyle={{ resizeMode: 'cover' }} style={styles.backgroundImage}>
					<Grid style={styles.cancel}>
						<Button rounded style={styles.cancelBtn} onPress={this._clearImage}>
							<Icon name="md-close-circle" style={{ fontSize: 35 }} />
						</Button>
					</Grid>
					<Container style={styles.footer}>
						<Button rounded style={styles.fButton} onPress={this._uploadImage}>
							<Icon name="md-send" style={{ fontSize: 50 }} />
						</Button>
					</Container>
				</ImageBackground>
			)
		}
		else if (this.props.lastImage != null) {
			return (

				<ImageBackground source={{ uri: this.state.url }} imageStyle={{ resizeMode: 'cover' }} style={styles.backgroundImage}>
					<Container style={styles.footerR}>
						<Content>
							<Text style={styles.Rtext}>Do you want to Upload last clicked Image?</Text>
							<Grid style={styles.wrapper}>
								<Col>
									<Button rounded style={styles.fRButton} onPress={this._clearImage}>
										<Icon name="md-close-circle" style={{ fontSize: 40 }} />
									</Button>
								</Col>
								<Col>
									<Button rounded style={styles.fRlButton} onPress={this._uploadImage}>
										<Icon name="md-checkmark-circle" style={{ fontSize: 40 }} />
									</Button>
								</Col>
							</Grid>
						</Content>
					</Container>
				</ImageBackground>
			)
		}
		else {
			return (this.props.isFocused ?
				<Container>
					<Content>
						<Camera ref={ref => {
							this.camera = ref;
						}} type={this.state.type}
							useCamera2Api={true}	>
							<Container style={styles.footer}>
								<TouchableOpacity
									onPress={this._takePicture}
									style={{ alignSelf: 'center' }}
								>
									<MaterialCommunityIcons name="circle-outline"
										style={{ color: 'white', fontSize: 100, marginBottom: 20 }}
									></MaterialCommunityIcons>
								</TouchableOpacity>
							</Container>
						</Camera>
					</Content>
				</Container>
				: <Container />
			)
		}
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		flex: 1
	},
	text: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: 32
	},
	footer: {
		width: '100%',
		display: 'flex',
		backgroundColor: 'transparent',
		justifyContent: 'flex-end',
		marginBottom: 20
	},
	footerR: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		alignContent: 'center',
		backgroundColor: 'transparent',
		marginBottom: 20
	},
	fButton: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 80,
		width: 80
	},
	fRButton: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 70,
		width: 70
	},

	fRlButton: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 70,
		width: 70,
		marginLeft: 20
	},
	wrapper: {
		alignSelf: 'flex-end',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		alignContent: 'flex-end'
	},
	Rtext: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
		alignSelf: 'flex-end',
		fontSize: 23,
		marginBottom: 20
	},
	cancel: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		marginTop: 20
	},
	cancelBtn: {
		alignSelf: 'flex-start'
	}
});

const mapStateToProps = (state) => {
	return ({
		userDtl: state.user.userDetail,
		hasCameraPermission: state.camera.hasCameraPermission,
		lastImage: state.camera.lastImage
	})
}
const WithNav = withNavigationFocus(CameraComponent)
export default connect(mapStateToProps, { LastImage, ClearImage, CamPermissionAction })(WithNav)