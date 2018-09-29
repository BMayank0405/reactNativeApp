import React, { Component } from 'react'
import { Container, Content, Spinner } from "native-base";
import { StyleSheet } from 'react-native'
export default class MySpinner extends Component {
	render() {
		return (
			<Container style={styles.container}>
				<Content></Content>
				<Content>
					<Spinner color="blue" />
				</Content>
				<Content></Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "center"
	}
})