import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { authenticate, getActiveAuth } from '../../ducks/auth'
import Form from './Form'

class AuthScreen extends Component {
  handleLogin = data => {
    let { authenticate, datasourceId } = this.props

    console.log("DATA:", data)

    authenticate(datasourceId, data)
  }

  render() {
    let { datasourceId, app } = this.props

    let datasource = app.datasources[datasourceId]

    return (
      <View style={styles.wrapper}>
        <Form datasource={datasource} onSubmit={this.handleLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: '20%'
  },
  header: {
    fontSize: 24
  }
})

const mapStateToProps = state => ({
  datasourceId: getActiveAuth(state)
})

export default connect(mapStateToProps, { authenticate })(AuthScreen)
