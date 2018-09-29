import React from 'react'
import { TouchableOpacity, Text, View } from "react-native";
import { createStackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons'

const AppStackNavigator = createStackNavigator({
	AppTabNavigator: {
		screen: AppTabNavigator,
		navigationOptions: ({ navigation }) => ({
			title: 'POC APP	',
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					<View style={{ paddingHorizontal: 10 }}>
						<Icon name="ios-menu" size={24} />
					</View>
				</TouchableOpacity>
			)
		})
	}
});
export default AppStackNavigator
