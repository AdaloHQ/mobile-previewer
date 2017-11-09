import { StackNavigator } from 'react-navigation'

import AppList from './AppList'
import Viewer from './Viewer'

export default StackNavigator(
  {
    Home: { screen: AppList },
    Viewer: {
      screen: Viewer,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)
