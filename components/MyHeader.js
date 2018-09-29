import React, { Component } from 'react'
import { Header, Body, Title, Right, Button, Text, Container } from "native-base";
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';


class MyHeader extends Component {
	render() {
		return (
			<Header>
				<Body>
					<Title style={styles.header}>POC APP</Title>
				</Body>
				{Object.keys(this.props.userDtl.userDetail || {}).length > 0 ? <Right>
					<Button hasText transparent>
						<Icon name="ios-power" />
					</Button>
				</Right> : <Right />}
			</Header>
		)
	}
}
const mapStateToProps = (state) => {
	return ({
		userDtl: state.user
	})
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 22
	}
})

export default connect(mapStateToProps)(MyHeader)