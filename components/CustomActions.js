/** @format */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import firebase from 'firebase';
import 'firebase/firestore';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default class CustomActions extends Component {
  constructor() {
    super();
  }

  async pickImage() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        if (!result.cancelled) {
          const imagePath = await this.uploadImage(result.uri);
          this.props.onSend({ image: imagePath, text: '' });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async takePhoto() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    try {
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        if (!result.cancelled) {
          const imagePath = await this.uploadImage(result.uri);
          this.props.onSend({ image: imagePath, text: '' });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async uploadImage(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    blob.close();
    return await snapshot.ref.getDownloadURL();
  }

  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});
      const longitude = JSON.stringify(result.coords.longitude);
      const latitude = JSON.stringify(result.coords.latitude);
      if (result) {
        this.props.onSend({
          location: {
            longitude: longitude,
            latitude: latitude,
          },
          text: '',
        });
        this.setState({
          location: result,
        });
      }
    }
  }

  onActionPress = () => {
    const options = [
      'choose from your library',
      'take a picture',
      'send location',
      'cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('user wants to take a picture');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessible={true}
        accessibilityLabel='more chat options'
        accessibilityHint='take a photo, send a photo, or share your location'
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginBottom: 7,
  },
  wrapper: {
    borderRadius: 80,
    borderColor: 'rgba(97, 80, 85, .3)',
    borderWidth: 2,

    flex: 1,
  },
  iconText: {
    color: 'rgba(97, 80, 85, .6)',
    fontWeight: 'bold',
    marginTop: -2,
    fontSize: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
