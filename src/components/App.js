import { StackNavigator } from 'react-navigation'

import AppList from './AppList'
import Viewer from './Viewer'
import Login from './Login'

export default StackNavigator(
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
