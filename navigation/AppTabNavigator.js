import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';
import CameraScreen from '../screens/appScreens/CameraScreen';
import SearchScreen from '../screens/appScreens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons'
const AppTabNavigator = createBottomTabNavigator({
	SearchScreen: {
		screen: SearchScreen,
		navigationOptions: {
			tabBarLabel: 'SEARCH',
			tabBarIcon: () => (
				<Icon name="ios-search" size={24} />
			)
		}

	},
	HomeScreen: {
		screen: CameraScreen,
		navigationOptions: {
			tabBarLabel: 'UPLOAD',
			tabBarIcon: () => (
				<Icon name="ios-camera" size={24} />
			)
		}
	}

})
export default AppTabNavigator
