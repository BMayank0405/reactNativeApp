
import { createSwitchNavigator } from 'react-navigation';
import AppStackNavigator from './AppStackNavigator';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import CameraScreen from '../screens/appScreens/CameraScreen'

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Check: CameraScreen,
  Login: LoginScreen,
  App: AppStackNavigator
});