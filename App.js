/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Linking,
  LogBox
} from 'react-native';
import config from './aws-exports';
import Amplify from '@aws-amplify/core';
import AppNavigation from './navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import InAppBrowser from 'react-native-inappbrowser-reborn';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const urlOpener = async (url, redirectUrl) => {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

// Amplify.configure(config);

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

GoogleSignin.configure({
  scopes: ['openid', 'email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '954918705725-4jfjcd32q08otbrf0kuocsi2nlinb400.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: 'xxxxxxxxxxxxxx.apps.googleusercontent.com' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const App = () => {

  return (
    <AppNavigation />
  );
};

const styles = StyleSheet.create({
});

export default App;
