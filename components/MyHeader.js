import React, { Component } from 'react'
import { Header, Body, Title, Right, Button, Text, Container, Icon } from "native-base";
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';


class MyHeader extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Header>
				<Body>
					<Title style={styles.header}>POC APP</Title>
				</Body>
				{Object.keys(this.props.userDtl || {}).length > 0 ? <Right>
					<Button hasText transparent onPress={this.props.logout}>
						<Icon name="ios-power" />
					</Button>
				</Right> : <Right />}
			</Header>
		)
	}
}
const mapStateToProps = (state) => {
	return ({
		userDtl: state.user.userDetail
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