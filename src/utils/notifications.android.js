import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: true,
  promptOnMissingPlayServices: true,
  apiKey: 'AIzaSyC4JQq-yNqZPP4Ig3_vSoSgLifWAoTYa1M',
  appId: 'com.protonpreviewer',
  projectId: 'previewer-android',
  databaseURL: 'https://previewer-android.firebaseio.com',
  storageBucket: 'previewer-android.appspot.com',
  messagingSenderId: '627288280805',
}

const firebase = RNFirebase.initializeApp(configurationOptions)

export const register = async ({ onRegister, onNotification }) => {
  firebase
    .messaging()
    .getToken()
    .then((token) => {
      console.log('-------> REGISTERED...', token)
      onRegister(token)
    })
    .catch((err) => {
      console.log('----------> ERROR GETTING TOKEN!!!:', err)
    })

  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      console.log('---------> GOT NOTIFICATIONS PERMISSION!!!')
    })
    .catch((err) => {
      console.log('---------> ERROR GETTING NOTIFICATIONS PERMISSION...', err)
    })

  const handleNotification = (notif) => {
    console.log('-----------> NOTIFICATION DATA:', notif.notification.data)

    const { appId, target, ...params } = notif.notification.data
    const route = { target, params }

    onNotification(appId, route)
  }

  firebase.notifications().onNotificationOpened(handleNotification)

  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification()

  if (notificationOpen) {
    handleNotification(notificationOpen)
  }
}
