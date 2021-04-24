
**prattle**

Prattle is a chat app created with React-Native.

**installation**

to install the app, enter the following into the terminal

` npm install `

to run the app locally, enter

`expo start`

project dependencies

```
  @react-native-async-storage/async-storage
     @react-native-community/async-storage
     @react-native-community/masked-view
     @react-native-community/netinfo
     @react-navigation/native
     expo
     expo-image-picker
     expo-keep-awake
     expo-location
     expo-permissions
     expo-status-bar
     firebase
     react
     react-dom
     react-native
     react-native-gesture-handler
     react-native-gifted-chat
     react-native-maps
     react-native-reanimated
     react-native-safe-area-context
     react-native-screens
     react-native-web
     react-navigation
     react-navigation-stack
```

**setting up the database**

Google Firestore database was used for this app.

1. Go to Google Firebase and click on “sign in”
2. Click on the “go to console” link and click on Create Project
3. A form will appear asking for basic information.
4. Give your new project a name.
5. With the default settings selected, agree to the terms and click “Create Project.”
6. Create a database then click on “Develop” from the menu on the left-hand side.
7. From the additional menu that appears, select “Database”.
8. Choose “Create database” in the Cloud Firestore section.
9. Make sure to create a Firestore Database—not a “Realtime Database.”