/** @format */

import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
/**
 *@requires react
 *@requires react-nativeb
 */

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
     * Touching a TouchableOpacity will set the background color on the next screen.
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
            accessibilityRole='text'
          />
          <Text style={styles.backgroundLabel}>choose background color:</Text>
          //when a color is tapped on by the user, it is stored in the state as
          the background color for the chat room
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
              onPress={() => this.setState({ color: '#FF9D7D' })}
              style={[styles.colorButton, styles.color3]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ color: '#74B7FF' })}
              style={[styles.colorButton, styles.color4]}
            />
          </View>
          <TouchableOpacity
            style={styles.enterButton}
            onPress={() =>
              this.props.navigation.navigate('Prattle', {
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
    backgroundColor: '#fff9f7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 250,
    margin: 20,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    borderWidth: 0,
    borderRadius: 80,
  },

  backImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  nameInput: {
    width: '30%',
    height: 40,
    fontSize: 16,
    fontWeight: '300',
    color: '#1B1618',
    opacity: 50,
    borderColor: '#1B1618',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
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
    fontSize: 45,
    fontWeight: '600',
    color: '#FF9D7D',
    paddingTop: 10,
  },
  colorSelection: {
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
    backgroundColor: '#FF9D7D',
  },
  color4: {
    backgroundColor: '#74B7FF',
  },
  enterButton: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
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
