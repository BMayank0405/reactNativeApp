
import { createSwitchNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen'


export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Logout: LogoutScreen,
  Login: LoginScreen,
  App: AppTabNavigator
});