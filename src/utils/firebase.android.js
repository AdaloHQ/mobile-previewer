import * as firebase from 'firebase'

let config = {
    apiKey: 'AIzaSyC4JQq-yNqZPP4Ig3_vSoSgLifWAoTYa1M',
    authDomain: 'XXXXX',
    databaseURL: 'XXXXX',
    projectId: 'previewer-android',
    storageBucket: 'previewer-android.appspot.com',
    messagingSenderId: '627288280805'
}

firebase.initializeApp(config)

export default firebase
