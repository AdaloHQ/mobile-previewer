import { Platform, PushNotificationIOS } from 'react-native'
import PushNotification from 'react-native-push-notification'

export const register = ({ onRegister, onNotification }) => {
  PushNotification.configure({
    onRegister: handleRegister(onRegister),
    onNotification: handleNotification(onNotification),
    senderID: '627288280805',
    popInitialNotification: true,
    requestPermissions: false,
  });

  console.log('REQUESTING....')
  setTimeout(() => {
    PushNotification.requestPermissions()
  })
  console.log('REQUESTED....')
}

const handleNotification = callback => notification => {
  let { userInteraction } = notification
  let { appId, route } = notification.data

  if (Platform.OS === 'ios') {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }

  if (!userInteraction || !appId || !route || !route.target) { return }

  callback(appId, route)
}

const handleRegister = callback => device => {
  console.log('------------------->', JSON.stringify(device))

  callback(device.token)
}

