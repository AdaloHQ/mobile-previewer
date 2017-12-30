import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { GROUP_TYPE_INPUT } from 'apto-constants'

import { changeValue, getValue } from '../../ducks/formInputs'
import Group from '../Group'

class Input extends Component {
  handlePress = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  handleChange = text => {
    let { changeValue, object } = this.props

    changeValue(object.id, text)
  }

  inputRef = input => {
    this.input = input
  }

  render() {
    let { object, component, renderChildren, value } = this.props

    let { attributes, children } = object
    let {
      groupTypeOptions,
      x, y, width, height
    } = attributes

    let prototypeId = groupTypeOptions[GROUP_TYPE_INPUT].textInputObject
    let prototype = children.filter(c => c.id === prototypeId)[0]
    let otherChildren = children.filter(c => c.id !== prototypeId)

    let fontSize = 14
    let color = '#000'

    if (prototype) {
      x = prototype.x
      y = prototype.y
      width = prototype.width
      color = prototype.color
      fontSize = prototype.fontSize
    }

    let inputStyle = {
      color,
      fontSize
    }

    return (
      <Group component={component} object={object}>
        {renderChildren(otherChildren)}
        <TouchableHighlight
          onPress={this.handlePress}
          underlayColor="transparent"
        >
          <View style={[styles.input]}>
            <TextInput
              style={inputStyle}
              ref={this.inputRef}
              returnKeyType="done"
              onChangeText={this.handleChange}
              value={value || ''}
              placeholder="Enter Text"
            />
          </View>
        </TouchableHighlight>
      </Group>
    )
  }
}

const styles = StyleSheet.create({
})

const mapStateToProps = (state, { object }) => ({
  value: getValue(state, object.id)
})

export default connect(mapStateToProps, { changeValue })(Input)
