import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import { getApps, getLoading, requestApps } from '../../ducks/apps'
import Loader from '../Shared/Loader'
import ListView from './List'
import LogoutButton from './LogoutButton'
import LogoImage from './images/proton-logo.png'

class ListWrapper extends Component {
  componentWillMount() {
    this.props.requestApps()
  }

  handlePress = appId => {
    let { navigation } = this.props

    navigation.navigate('Viewer', { appId })
  }

  render() {
    let { apps, loading, requestApps } = this.props

    return (
      <View style={styles.body}>
        <StatusBar barStyle="dark-content" />
        <ListView
          apps={apps}
          loading={loading}
          onPressItem={this.handlePress}
          onRefresh={requestApps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    borderBottomWidth: 0
  },
})

const mapStateToProps = state => ({
  apps: getApps(state),
  loading: getLoading(state)
})

const ConnectedListWrapper = connect(
  mapStateToProps,
  { requestApps }
)(ListWrapper)

export default StackNavigator(
  {
    Main: {
      screen: ConnectedListWrapper,
      navigationOptions: {
        title: (
          <Image source={LogoImage} />
          //<Text style={{ color: '#f00' }}>My Apps</Text>
        ),
        headerStyle: styles.header,
        //headerLeft: <LogoutButton />
      }
    }
  }
)
