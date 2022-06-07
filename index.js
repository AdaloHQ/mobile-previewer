/**
 * @format
 */

import { initTracing } from '@protonapp/proton-runner'
import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'

// Initialize tracing with null DSN so that no transactions are captured or sent.
initTracing(null)

AppRegistry.registerComponent(appName, () => App)
