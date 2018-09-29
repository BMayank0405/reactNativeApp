import React, { Component } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground
} from "react-native";

import { Camera, FileSystem, Permissions } from 'expo';
import { Container, Content, Button, Text, Body, Grid, Spinner, Card, Icon, CardItem, Left, Footer, FooterTab } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MySpinner from "../../components/MySpinner";

class CameraComponent extends Component {

	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		url: null,
		newPhoto: false,
		isloading: false
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' })
	}
	async componentDidMount() {
		console.log(FileSystem);
		try {
			await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'appphotosnewc')
		}
		catch (err) {
			console.log(err);
		}

	}

	_takePicture = async () => {
		this.camera.takePictureAsync({ onPictureSaved: this._onPictureSaved });

	};
	_onPictureSaved = async photo => {
		await this.setState({
			url: photo.uri,
			newPhoto: true,
		})

	}
	_uploadImage = async () => {
		this.setState({
			isloading: true,
			newPhoto: false
		})
		const data = new FormData();
		const timestamp = Date.now();
		data.append('timestamp', timestamp); // you can append anyone.
		data.append('image', {
			uri: this.state.url,
			type: 'image/jpeg', // or photo.type
			name: 'IMG-' + timestamp + '.jpg'
		});
		try {
			const result = await fetch('https://pocappserver.herokuapp.com/savePhotos', {
				method: 'post',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: data
			})
			console.log("result", result)

		}
		catch (err) {
			console.log("error", err)
		}
		this.setState({
			isloading: false,
			newPhoto: false
		})

	}
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
					<Container style={styles.footer}>
						<Button rounded style={styles.fButton} onPress={this._uploadImage}>
							<Icon name="md-send" style={{ fontSize: 50 }} />
						</Button>
					</Container>
				</ImageBackground>
			)
		}
		else {
			return (
				<Container>
					<Content>
						<Camera ref={ref => {
							this.camera = ref;
						}} type={this.state.type} >
							<Container style={styles.footer}>
								<TouchableOpacity
									onPress={this._takePicture}
									style={{ alignSelf: 'center' }}
								>
									<MaterialCommunityIcons name="circle-outline"
										style={{ color: 'white', fontSize: 100 }}
									></MaterialCommunityIcons>
								</TouchableOpacity>
							</Container>
						</Camera>
					</Content>
				</Container>
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
	fButton: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 80,
		width: 80
	}
});

export default CameraComponent;