/** @format */

import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
/**
 * @class Prattle
 * @requires React
 * @requires React-native
 */

export default class Prattle extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      _id: '',
      name: '',
      avatar: '',
    };
  }

  /**
   * sets default data for a user if none is provided
   * @params {string} _id
   * @params {string} name
   * @params {string} avatar
   * called in componentWillMount()
   */

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'react native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text:
            this.props.navigation.state.params.name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
