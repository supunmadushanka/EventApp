import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Text
} from 'react-native';
import Auth from '@aws-amplify/auth';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const AuthLoadingScreen = () => {

  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const showLoadingSpinner = (!userToken && loading);

  useEffect(() => {
    loadApp();
  }, []);

  const loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        signIn(user);
        console.log(user);
      })
      .catch(() => {
        console.log('err signing in');
      });
    setLoading(false);
  }

  const signOut = async () => {
    await Auth.signOut()
      .catch((err) => {
        console.log('ERROR: ', err);
      });
    setUserToken(null);
  }

  const signIn = async (user) => {
    // setUserToken(user.signInUserSession.accessToken.jwtToken);
    setUserToken(user);
    
    console.log(user);
  }

  let view = '';
  if (showLoadingSpinner) {
    view = (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  } else if (!userToken) {
    view = <AuthNavigator signIn={signIn} />;
  } else {
    view = <AppNavigator signOut={signOut} />;
  }

  const linking = {
    prefixes: [
      'myapp://'
    ],
    config: {
      screens: {
        StartSlide: 'StartSlide'
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {view}
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
