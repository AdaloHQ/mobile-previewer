import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { GROUP_TYPE_INPUT } from 'apto-constants'

import Group from '../Group'

export default class Input extends Component {
  handlePress = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  inputRef = input => {
    this.input = input
  }

  render() {
    let { object, component, renderChildren } = this.props

    let {
      groupTypeOptions,
      children,
      x, y, width, height
    } = object

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

    let inputPosition = {
      left: x,
      top: y
    }

    let inputStyle = {
      width,
      color,
      fontSize
    }

    let targetPosition = {
      left: object.x,
      top: object.y,
      width: object.width,
      height: object.height
    }

    return (
      <Group component={component} object={object}>
        {renderChildren(otherChildren)}
        <TouchableHighlight
          onPress={this.handlePress}
          style={[styles.tapTarget, targetPosition]}
          underlayColor="transparent"
        >
          <View />
        </TouchableHighlight>
        <View style={[styles.input, inputPosition]}>
          <TextInput
            style={inputStyle}
            ref={this.inputRef}
            returnKeyType="done"
          />
        </View>
      </Group>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    position: 'absolute'
  }
})
