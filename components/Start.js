/** @format */

import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
    };
  }

  render() {
    /**TextInput will set the user's name.
     * Touching a TouchableOpacity will set the background color in the application's state on the next screen.
     */
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.backImage}
      >
        <Text style={styles.title}>prattle</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.nameInput}
            // when name is changed it's stored in the state to pass on to a chat room
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='enter your name here...'
            accessible={true}
            accessibilityLabel='name input'
          />
          <Text style={styles.backgroundLabel}>choose background color:</Text>

          <View style={styles.colorSelection}>
            <TouchableOpacity
              onPress={() => this.setState({ color: '#FFF9F7' })}
              style={[styles.colorButton, styles.color1]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#E8F7EE' })}
              style={[styles.colorButton, styles.color2]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#FFA552' })}
              style={[styles.colorButton, styles.color3]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#63ABA5' })}
              style={[styles.colorButton, styles.color4]}
            />
          </View>
          <TouchableOpacity
            style={styles.enterButton}
            onPress={() =>
              this.props.navigation.navigate('prattle', {
                name: this.state.name,
                color: this.state.color,
              })
            }
            accessible={true}
            accessibilityLabel='chat button'
            accessibilityHint='start a conversation'
            accessibilityRole='button'
          >
            <Text style={styles.enterButtonText}>prattle on!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
/**
 * component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 249, 247, .83)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: 250,
    margin: 20,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    borderWidth: 0,
    borderRadius: 50,
  },

  backImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  nameInput: {
    width: '50%',
    height: 40,
    fontSize: 12,
    fontWeight: '300',
    color: '#1B1618',
    opacity: 50,
    borderColor: '#1B1618',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backgroundLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: '#1B1618',
    paddingTop: 15,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    fontSize: 70,
    fontWeight: '800',
    color: '#FFA552',
    paddingTop: 10,
  },
  colorSelection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  colorButton: {
    height: 35,
    width: 35,
    borderRadius: 80,
    margin: 20,
    borderWidth: 3,
    borderColor: '#615055',
  },
  color1: {
    backgroundColor: '#FFF9F7',
  },
  color2: {
    backgroundColor: '#E8F7EE',
  },
  color3: {
    backgroundColor: '#FFA552',
  },
  color4: {
    backgroundColor: '#63ABA5',
  },
  enterButton: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#fff9f7',
    backgroundColor: '#615055',
  },
  enterButtonText: {
    fontSize: 18,
    color: '#fff9f7',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
