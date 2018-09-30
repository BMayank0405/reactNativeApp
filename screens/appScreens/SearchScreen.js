import React, { Component } from 'react'
import { StyleSheet, Modal, FlatList, Alert, Image, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Container, Content, Button, Text, Body, Grid, Spinner, Card, Icon, CardItem, Left } from 'native-base';
import { connect } from 'react-redux';

import MySpinner from '../../components/MySpinner'
import MyHeader from '../../components/MyHeader'
import { ClearImage } from "../../action/ClearImageAction";

class MyDatePicker extends Component {
	constructor(props) {
		super(props)
		var { height, width } = Dimensions.get('window');
		const Currdate = new Date();
		const defaultDate = Currdate.getFullYear() + '-' + this._format(Currdate.getMonth()) + '-' + this._format(Currdate.getDate())
		const nextDate = Currdate.getFullYear() + '-' + this._format(Currdate.getMonth()) + '-' + this._format(Currdate.getDate() + 1)
		this.state = {
			startDate: defaultDate,
			endDate: nextDate,
			maxStartDate: defaultDate,
			maxEndDate: nextDate,
			minEndDate: '2016-05-01',
			startTime: Date.parse(defaultDate),
			endTime: Date.parse(nextDate),
			items: {
				value: []
			},
			modalVisible: false,
			isloading: false,
			height,
			width
		}
	}

	//card items for rendering 
	_cardItems = ({ item }) => {
		return (
			<Card>
				<CardItem cardBody>
					<Image source={{ uri: item.url }} style={{ flex: 1, height: (item.height * this.state.width) / item.width, width: this.state.width }} resizeMode="contain" />
				</CardItem>
				<CardItem>
					<Left>
						<Icon active name="md-time" />
						<Text>Uploaded At</Text>
					</Left>
					<Body>
						<Text>{this._convert(item.timestamp)}</Text>
					</Body>
				</CardItem>
			</Card>
		)
	}

	//timestamp functions
	_convert(timestamp) {
		const date = new Date(timestamp)
		return this._format(date.getDate()) + '-' + this._format(date.getMonth()) + '-' + date.getFullYear();
	}

	_format = (value) => value > 10 ? value : '0' + value
	//end of timestamp functions


	_keyExtractor = (item, index) => item._id.toString();

	//validating dates
	_StartDateChange(date) {
		this.setState({
			startDate: date,
			minEndDate: date,
			startTime: Date.parse(date)
		})
		if (this.state.endTime < this.state.startTime) {
			const Currdate = new Date();
			const nextDate = Currdate.getFullYear() + '-' + this._format(Currdate.getMonth()) + '-' + this._format(Currdate.getDate() + 1)
			this.setState({
				endDate: nextDate,
				endTime: Date.parse(nextDate)
			})
		}
	}

	_EndDateChange(date) {
		this.setState({
			endDate: date,
			endTime: Date.parse(date)
		})
	}
	//end of validating dates

	_setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}


	async _Search() {
		this.setState({
			isloading: true
		})
		const value = {
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			email: this.props.userDtl.email
		};
		const data = JSON.stringify(value)
		const item = await fetch('https://pocappserver.herokuapp.com/getphotos', {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: data
		}
		)
		const items = await item.json();
		this.setState({
			isloading: false,
			modalVisible: true,
			items: { value: items }
		})

	}

	render() {
		return (this.state.isloading ?
			<MySpinner />
			:
			<Container>
				<MyHeader logout={() => this.props.navigation.navigate('Logout')} />
				<Container style={styles.container}>

					<Content>
						<Grid style={styles.marginBottom}>
							<Text>From</Text>
							<DatePicker
								style={{ width: 200 }}
								date={this.state.startDate}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate="2018-09-20"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 7,
										marginLeft: 10
									},
									dateInput: {
										marginLeft: 45
									}
								}}
								onDateChange={(date) => this._StartDateChange(date)}
							/>
						</Grid>
						<Grid style={styles.marginBottom}	>
							<Text>To</Text>
							<DatePicker
								style={{ width: 200 }}
								date={this.state.endDate}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate={this.state.minEndDate}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 7,
										marginLeft: 10
									},
									dateInput: {
										marginLeft: 45
									}
								}}
								onDateChange={(date) => this._EndDateChange(date)}
							/>
						</Grid>
						<Grid style={styles.button}>
							<Button onPress={() => this._Search()}>
								<Text>Search</Text>
							</Button>
						</Grid>
						<Modal animationType="slide"
							transparent={false}
							visible={this.state.modalVisible}
							onRequestClose={() => {
								Alert.alert(
									'Confirm',
									'Do you want to go back ?',
									[
										{ text: 'Cancel', onPress: () => this._setModalVisible(this.state.modalVisible) },
										{ text: 'OK', onPress: () => this._setModalVisible(!this.state.modalVisible) }
									],
									{ cancelable: false }
								)

							}}>
							{this.state.items.value.length > 0 ?
								<Content>

									<FlatList style={{ flex: 1 }}
										data={this.state.items.value}
										renderItem={this._cardItems}
										keyExtractor={this._keyExtractor} />
									<Body></Body>
									<Body>
										<Button onPress={() => {
											this._setModalVisible(!this.state.modalVisible);
										}}>
											<Text>Go back</Text>
										</Button>
									</Body>

								</Content> :
								<Container style={{ margin: 10 }}>
									<Content>
										<Body>
											<Text style={{ fontSize: 27 }}>You have no images in this duration.Please go back and try for some other combination.</Text>
										</Body>
										<Body>
											<Button style={{ marginTop: 20 }} onPress={() => {
												this._setModalVisible(!this.state.modalVisible);
											}}>
												<Text>Go back</Text>
											</Button>
										</Body>

									</Content>
								</Container>
							}
						</Modal>
					</Content>
				</Container>
			</Container>
		)
	}
}



const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 30,
		flexWrap: 'wrap',
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	marginBottom: {
		marginBottom: 10
	},
	button: {
		display: 'flex',
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 7

	}
})

const mapStateToProps = (state) => {
	return ({
		userDtl: state.user.userDetail
	})
}
export default connect(mapStateToProps)(MyDatePicker)