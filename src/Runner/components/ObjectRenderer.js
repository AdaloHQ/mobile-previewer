import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LABEL, SECTION, GROUP, LIST, GROUP_TYPE_INPUT } from 'apto-constants'

import Label from './Label'
import Section from './Section'
import Input from './Input'
import Group from './Group'
import List from './List'

export default class ObjectRenderer extends Component {
  static defaultProps = {
    parentBindingData: {}
  }

  renderChildren = (children, newBindings=null) => {
    let { component, bindingData, parentBindingData } = this.props

    parentBindingData = {
      ...parentBindingData,
      ...newBindings
    }

    return children.map(child => (
      <ObjectRenderer
        key={child.id}
        component={component}
        object={child}
        bindingData={bindingData}
        parentBindingData={parentBindingData}
      />
    ))
  }

  render() {
    let { component, object, bindingData, parentBindingData } = this.props

    if (object.hidden) {
      return null
    }

    let baseProps = {
      component,
      object,
      bindingData,
      parentBindingData,
      renderChildren: this.renderChildren
    }

    switch (object.type) {
      case LABEL:
        return (
          <Label {...baseProps} />
        )
      case SECTION:
        return (
          <Section {...baseProps} />
        )
      case GROUP:
        if (object.groupType === GROUP_TYPE_INPUT) {
          return (
            <Input {...baseProps} />
          )
        }

        return (
          <Group component={component} object={object}>
            {this.renderChildren(object.children)}
          </Group>
        )
      case LIST:
        return (
          <List {...baseProps} />
        )
      default:
        return null
    }
  }
}

