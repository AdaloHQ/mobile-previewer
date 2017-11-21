import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LABEL, SECTION, GROUP, GROUP_TYPE_INPUT } from 'apto-constants'

import Label from './Label'
import Section from './Section'
import Input from './Input'
import Group from './Group'

export default class ObjectRenderer extends Component {
  renderChildren = children => {
    let { component, bindingData } = this.props

    return children.map(child => (
      <ObjectRenderer
        key={child.id}
        component={component}
        bindingData={bindingData}
        object={child}
      />
    ))
  }

  render() {
    let { component, object, bindingData } = this.props

    if (object.hidden) {
      return null
    }

    switch (object.type) {
      case LABEL:
        return (
          <Label
            component={component}
            bindingData={bindingData}
            object={object}
          />
        )
      case SECTION:
        return (
          <Section
            component={component}
            bindingData={bindingData}
            object={object}
          />
        )
      case GROUP:
        if (object.groupType === GROUP_TYPE_INPUT) {
          return (
            <Input
              object={object}
              renderChildren={this.renderChildren}
            />
          )
        }

        return (
          <Group>
            {this.renderChildren(object.children)}
          </Group>
        )
      default:
        return null
    }
  }
}

