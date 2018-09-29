
import { createDrawerNavigator } from 'react-navigation';
import AppStackNavigator from './AppStackNavigator';
import LogoutScreen from '../screens/LogoutScreen'
const AppDrawerNavigator = createDrawerNavigator({
	Home: AppStackNavigator,
	Logout: LogoutScreen
})

export default AppDrawerNavigator