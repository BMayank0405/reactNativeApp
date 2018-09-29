import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Container, Header, Content, Button, Text, Grid, Card, Icon, CardItem, Image, Left, Body } from 'native-base';
export default class MyDatePicker extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: {
				value: []
			},
			isloading: true
		}
	}
	async	componentWillMount() {
		const item = await fetch('https://jsonplaceholder.typicode.com/photos', {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			}
		});
		const items = await item.json();
		// console.log("Photos", await item.json());
		this.setState({
			items: { value: items }, isloading: false
		})
		console.log(this.state.items.value)
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
							<Icon active name="ios-clock-outline" />
							<Text>Updated on</Text>
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

	_format(value) {
		return value > 10 ? value : '0' + value
	}

	_convert(timestamp) {
		const date = new Date(timestamp)
		return this._format(date.getDate()) + '-' + this._format(date.getMonth()) + '-' + date.getFullYear();
	}



	render() {
		return (
			this.isloading ?
				<Container>
					<Content>
						<Spinner />
					</Content>
				</Container>
				:
				<Container>
					<Content>
						<FlatList
							data={this.state.items.value}
							renderItem={this._cardItems}>
						</FlatList>
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

