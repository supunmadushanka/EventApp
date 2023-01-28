import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, Image
} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import ButtonWithBorder from '../../components/ButtonWithBorder';
import Colors from '../../constants/Colors';
import {
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';
import { useIsFocused } from '@react-navigation/native';
import { Hub } from '@aws-amplify/core';
import { googleSignFedarated, facebookSignFedarated } from '../../handlers/authentication/federated-identity-handler';
import FacebookButton from '../../components/UI/FacebookButton';

export default function Welcome({ navigation, signIn: signInCb }) {

  const isFocused = useIsFocused();
  const loginMethod = 'cognito'; //federated or cognito

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => {
            console.log(userData);
            signInCb(userData);
          });
          break;
        case 'signOut':
          // setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    })

  }, [isFocused]);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }


  const googleSign = async () => {
    if (loginMethod == 'federated') {
      googleSignFedarated(signInCb);
    } else {
      await Auth.federatedSignIn(
        { provider: CognitoHostedUIIdentityProvider.Google }
      )
    }
  }

  const facebookSign = async (accessToken) => {
    if (loginMethod == 'federated') {
      facebookSignFedarated(accessToken, signInCb);
    } else {
      await Auth.federatedSignIn(
        { provider: CognitoHostedUIIdentityProvider.Facebook }
      )
    }
  }

  const logOut = async () => {
    console.log('logOut called')
    await Auth.signOut()
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/signIn1.jpg')}
        // resizeMode={'contain'}
        style={{
          alignSelf: 'center',
          marginTop: '8%',
          width: '80%',
          height: '35%'
        }}
      />
      <View style={styles.content}>
        <View style={styles.button}>
          <Button onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </Button>
        </View>
        <View style={styles.button}>
          <ButtonWithBorder onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </ButtonWithBorder>
        </View>
        <Text style={styles.Or}>or</Text>
        <View>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={googleSign}
          // disabled={}
          />
        </View>
        {loginMethod == 'federated' && <View>
          <LoginButton
            style={{ width: 184, height: 32, marginTop: 5 }}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  facebookSign(accessToken);
                  // console.log(result);
                });
              }
            }}
            onLogoutFinished={logOut}
          />
        </View>}
        {loginMethod == 'cognito' && <View style={styles.fbbutton}>
          <FacebookButton
            onPress={facebookSign}
          />
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: Colors.secondary,
    textShadowColor: '#FBF0F3',
    paddingHorizontal: 15,
    paddingTop: '2%',
    textAlign: 'center',
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 10,
    width: '70%'
  },
  fbbutton: {
    width: '45%',
    marginTop: 10,
  },
  Or: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10
  }
});

Welcome.propTypes = {
  signIn: PropTypes.func.isRequired,
};
