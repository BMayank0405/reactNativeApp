import React, { Component } from 'react'
import { StyleSheet, Modal, FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, Button, Text, Grid, Body } from 'native-base';
export default class MyDatePicker extends Component {
	constructor(props) {
		super(props)
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
			isloading: false
		}
	}
	_cardItems = ({ item }) => (
		<Content>
			<Card>
				<CardItem cardBody>
					<Image source={{ uri: item.url }} style={{ height: 200, width: null, flex: 1 }} />
				</CardItem>
				<CardItem>
					<Left>
						<Body transparent>
							<Grid>
								<Icon active name="ios-clock-outline" iconLeft />
								<Text>Updated on</Text>
							</Grid>
						</Body>
					</Left>
					<Body>
						<Body transparent>
							<Text>{item.title}</Text>
						</Body>
					</Body>
				</CardItem>
			</Card>
		</Content>
	)

	_format = (value) => value > 10 ? value : '0' + value

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
	_setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	_EndDateChange(date) {
		this.setState({
			endDate: date,
			endTime: Date.parse(date)
		})
	}

	async _Search() {
		this.setState({
			isloading: true
		})
		data = {
			startTime: this.state.startTime,
			endTime: this.state.endTime
		};
		// fetch('https://pocappserver.herokuapp.com/getphotos', {
		// 	method: "POST",
		// 	mode: "cors",
		// 	headers: {
		// 		"Content-Type": "application/json; charset=utf-8"
		// 	},
		// 	body: JSON.stringify(data)
		// }
		// )
		const item = await fetch('https://jsonplaceholder.typicode.com/photos', {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			}
		});
		const items = await item.json();
		this.setState({
			isloading: false,
			modalVisible: true,
			item: { value: items }
		})

	}

	render() {
		return (this.state.isloading ?
			<Container style={styles.container}>
				<Content>
					<Spinner />
				</Content>
			</Container>
			:
			<Container style={styles.container}>
				<Content>
					<Grid>
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
					<Grid>
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
					<Grid>
						<Button style={styles.button} onPress={() => this._Search()}>
							<Text>Search</Text>
						</Button>
					</Grid>

				</Content>
			</Container>
		)
	}
}



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

