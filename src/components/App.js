import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AppList from './AppList'
import Viewer from './Viewer'
import Login from './Login'

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AppList} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          navigationOptions: {
            gesturesEnabled: false
          }}}
      />
      <Stack.Screen
        name="Viewer"
        component={Viewer}
        options={{
          navigationOptions: {
            gesturesEnabled: false
          }}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
