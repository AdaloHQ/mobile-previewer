import React, { Component } from 'react'
import { View, Button, Text, TextInput, StyleSheet } from 'react-native'
import { reduxForm, Field } from 'redux-form'

import WrappedInput from '../Forms/WrappedInput'

class Form extends Component {
  renderUsername() {
    let { datasource } = this.props
    let { auth, tables } = datasource

    let usernameField = tables[auth.table].fields[auth.usernameField]

    return (
      <Field
        autoFocus
        autoCapitalize="none"
        name={auth.usernameField}
        component={WrappedInput}
        label={usernameField.name}
        placeholder="johnsnow"
        inputStyle={styles.input}
        labelStyle={styles.label}
        style={styles.field}
      />
    )
  }

  renderPassword() {
    let { datasource } = this.props
    let { auth, tables } = datasource

    let passwordField = tables[auth.table].fields[auth.passwordField]

    return (
      <Field
        secureTextEntry
        name={auth.passwordField}
        component={WrappedInput}
        label={passwordField.name}
        placeholder="••••••••"
        inputStyle={styles.input}
        labelStyle={styles.label}
        style={styles.field}
      />
    )
  }

  render() {
    let { handleSubmit } = this.props

    return (
      <View style={styles.wrapper}>
        {this.renderUsername()}
        {this.renderPassword()}
        <Button title="Login" onPress={handleSubmit}>
          Login
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 400,
    margin: 15
  },
  field: {
    marginTop: 8,
    marginBottom: 8
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    fontSize: 14
  },
  label: {
    marginBottom: 8
  }
})

export default reduxForm({
  form: 'loginForm'
})(Form)
