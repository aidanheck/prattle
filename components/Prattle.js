/** @format */

import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

/**
 * @class prattle
 * @requires React
 * @requires react-native
 * @requires react-native-keyboard-spacer
 * @requires react-native-gifted-chat
 * @requires react-native-community/netinfo
 */

/**
 * credentials for firebase
 * @constant firebaseConfig
 * @type {object}
 * @default
 * @param {string} apiKey
 * @param {string} authDomain
 * @param {string} projectId
 * @param {string} storageBucket
 * @param {string} messageSenderId
 */

export default class Prattle extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      isConnected: false,
      loggedInMessage: '',
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };

    const firebaseConfig = {
      apiKey: 'AIzaSyBazMs0jNAJGtfLdTY3szvywhlz2Ah_thk',
      authDomain: 'prattle-be18a.firebaseapp.com',
      projectId: 'prattle-be18a',
      storageBucket: 'prattle-be18a.appspot.com',
      messagingSenderId: '431205066460',
    };
    //initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  /**
   * checks if user is online, handles authentication and then sets default data for a user if none is provided
   * @params {string} _id
   * @params {string} name
   * @params {string} avatar
   * called in componentWillMount()
   */

  componentDidMount() {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        });
        this.storedMessages = firebase.firestore().collection('messages');
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          //update the user state with active user data
          this.setState({
            user: {
              _id: user.uid,
              name: this.props.navigation.state.params.name,
            },
            messages: [],
            loggedInMessage: `${this.props.navigation.state.params.name} has entered the chat`,
          });
          this.unsubscribe = this.storedMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false,
          loggedInMessage: `${this.props.navigation.state.params.name} has entered the chat, but is offline`,
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    //app stops listening for changes
    this.authUnsubscribe();
    //app stops listening for authentication
    this.unsubscribe();
  }

  /**
   * update message state with recent data
   * @function onCollectionUpdate
   * @param {string} _id - message id
   * @param {string} text - content
   * @param {date} createdAt - date and time sent
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

  /**
   * loads all messages from AsyncStorage
   * @async
   * @function getMessages
   * @param {string} messages
   * @return {state} messages
   */
  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * saves all messages with AsyncStorage
   * @async
   * @function saveMessages
   * @param {string} messages
   * @return {AsyncStorage}
   */
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * deletes messages with AsyncStorage
   * @async
   * @function deleteMessages
   * @param {string} messages
   * @return {AsyncStorage}
   */

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
        return (
            <InputToolbar {...props}/>
        );
    }
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
          <Text style={styles.loggedInMessage}>
            {this.state.loggedInMessage}
          </Text>
        </View>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
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
