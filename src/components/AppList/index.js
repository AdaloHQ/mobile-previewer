import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { ioReady } from '../../utils/io'
import { getAuthVisible } from '../../ducks/users'
import ListWrapper from './ListWrapper'

class AppList extends Component {
  render() {
    let { navigation, authVisible } = this.props

    if (!ioReady()) { return null }

    if (authVisible && !global.authIsMounted) {
      navigation.navigate('Login')
    }

    return (
      <ListWrapper navigation={navigation} />
    )
  }
}

const mapStateToProps = state => ({
  authVisible: getAuthVisible(state)
})

export default connect(mapStateToProps)(AppList)
