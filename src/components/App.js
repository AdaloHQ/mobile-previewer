import { createStackNavigator, createAppContainer } from 'react-navigation'

import AppList from './AppList'
import Viewer from './Viewer'
import Login from './Login'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: AppList },
    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Viewer: {
      screen: Viewer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)
