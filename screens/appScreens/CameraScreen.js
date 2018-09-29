import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from "react-native";

import { Camera, FileSystem, Permissions } from 'expo';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CameraComponent extends Component {

	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		console.log(status)
		this.setState({ hasCameraPermission: status === 'granted' })
	}
	componentDidMount() {
		console.log(FileSystem.documentDirectory);
		FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'appphotosnewc').catch(e => {
			console.log(e, 'Directory exists');
		});
	}

	async _takePicture() {
		console.log('take picture');
		this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });

	};
	onPictureSaved = async photo => {
		await FileSystem.moveAsync({
			from: photo.uri,
			to: `${FileSystem.documentDirectory}appphotosnewcd/${Date.now()}.jpg`,
		});
		this.setState({ newPhotos: true });
	}
	async _uploadImage() {
		const data = new FormData();
		data.append('name', 'testName'); // you can append anyone.
		data.append('image', {
			uri: photo.uri,
			type: 'image/jpeg', // or photo.type
			name: 'testPhotoName'
		});
		const result = await fetch(url, {
			method: 'post',
			body: data
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
		else {
			return (
				<View style={{ flex: 1 }}>
					<Camera ref={ref => {
						this.camera = ref;
					}}
						style style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type} >
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>

							<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
								<View style={{ alignItems: 'center' }}>
									<TouchableOpacity
										onPress={this._takePicture()}
										style={{ alignSelf: 'center' }}
									>
										<MaterialCommunityIcons name="circle-outline"
											style={{ color: 'white', fontSize: 100 }}
										></MaterialCommunityIcons>
									</TouchableOpacity>
								</View>

							</View>
							<View style={{ alignItems: 'center' }}>

							</View>
						</View>
					</Camera>
				</View >
			)
		}
	}
}
export default CameraComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});