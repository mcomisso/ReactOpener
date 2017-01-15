/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import SSH from 'react-native-ssh';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  ToastAndroid,
  Text,
  View
} from 'react-native';

const colors = require('./colors');
const sshConfiguration = require('./sshConfiguration');

/**
 * Base app
 */
export default class ReactOpener extends Component {

  // Constructor adds props
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    var spinner = this.state.isLoading ? (<ActivityIndicator
    size='large'/>) : (<View/>) ;

    return (
      <View style={styles.container}>
        <View>
          {spinner}
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(colors.accentColor)}
          onPress={this._onPressSendRequest}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Aziona Garage</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  _onPressSendRequest = () => {

    this.setState({isLoading: true});

    SSH.execute(sshConfiguration.config, sshConfiguration.command).then(
      result => {
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        this.setState({isLoading: false});
        console.log(result);
      },
      error => {
        ToastAndroid.show('Error', ToastAndroid.SHORT);
        this.setState({isLoading: false});
        console.log('Error: ', error);
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    width: 250, 
    height: 200, 
    backgroundColor: colors.defaultPrimaryColor, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 30,
    color: colors.textPrimaryColor
  },
});

AppRegistry.registerComponent('ReactOpener', () => ReactOpener);
