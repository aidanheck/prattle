/** @format */

import React, { Component } from 'react';
import { LogBox, Text, View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

/**
 * @class Prattle
 * @requires React
 * @requires React-native
 */

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBazMs0jNAJGtfLdTY3szvywhlz2Ah_thk',
  authDomain: 'prattle-be18a.firebaseapp.com',
  projectId: 'prattle-be18a',
  storageBucket: 'prattle-be18a.appspot.com',
  messagingSenderId: '431205066460',
};

export default class Prattle extends Component {
  constructor() {
    super();
    //initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      loggedInMessage: '',
    };
  }
  /**
   * credentials for firebase
   * @constant firebaseConfig
   * @type {object}
   * @default
   */

  /**
   * checks if user is online, handles authentication and then sets default data for a user if none is provided
   * @params {string} _id
   * @params {string} name
   * @params {string} avatar
   * called in componentWillMount()
   */

  componentDidMount() {
    this.storedMessages = firebase.firestore().collection('messages');
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update the user state with active user data
      this.setState({
        user: {
          _id: user.uid,
          name: this.props.navigation.state.params.name,
        },
        loggedInMessage: `${this.props.navigation.state.params.name} has entered the chat`,
      });
      this.authUnsubscribe = this.storedMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    // this.unsubscribe();
  }

  /**
   * update message state with recent data
   * @function onCollectionUpdate
   * @param {string} _id - message id
   * @param {string} text - content
   * @param {date} cratedAt - date and time sent
   * @param {string} user - user data
   * @returns {state}
   */

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //searches through stored documents
    querySnapshot.forEach((doc) => {
      //gathers the querydocsnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  /**
   * pushes messages to firestore database
   * @function addMessages
   * @param {string} _id - message id
   * @param {string} text - message content
   * @param {date} createdAt - date and time of message
   */

  addMessages = () => {
    const message = this.state.messages[0];
    this.storedMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#615055',
          },
        }}
      />
    );
  }

  render() {
    /**Prattle component uses user name and background color defined in Start component */
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.navigation.state.params.color,
        }}
      >
        <View style={styles.welcomeBox}>
        <Text style={styles.loggedInMessage}>{this.state.loggedInMessage}</Text>
        </View>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#615055',
    width: '100%',
    height: 25,
    opacity: 0.5,
  },
  loggedInMessage: {
    alignItems: 'center',
    color: '#fff9f7',
    padding: 20,
    marginBottom: 5,
  },
});
