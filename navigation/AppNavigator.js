
import { createSwitchNavigator } from 'react-navigation';
import AppDrawerNavigator from './AppDrawerNavigator';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/appScreens/SearchScreen'

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Check: SearchScreen,
  Login: LoginScreen,
  App: AppDrawerNavigator
});