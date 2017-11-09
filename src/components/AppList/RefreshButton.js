import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'

import { requestApps } from '../../ducks/apps'

class RefreshButton extends Component {
  handlePress = () => {
    this.props.requestApps()
  }

  render() {
    return (
      <Button onPress={this.handlePress} title="Refresh" />
    )
  }
}

export default connect(null, { requestApps })(RefreshButton)
