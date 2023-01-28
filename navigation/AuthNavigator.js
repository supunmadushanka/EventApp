import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/authentication/Welcome';
import SignInScreen from '../screens/authentication/SignIn';
import SignUpScreen from '../screens/authentication/SignUp';
import ForgetPasswordScreen from '../screens/authentication/ForgetPassword';
import Confirmation from '../screens/authentication/Confirmation';
import StartSlideScreen from '../screens/StartSlideScreen';
import SplashScreen from '../screens/SplashScreen'

const AuthStack = createNativeStackNavigator();
const AuthModalStack = createNativeStackNavigator();

const AuthNavigator = ({ signIn }) => (
  <AuthModalStack.Navigator mode="modal" headerMode="none">
    <AuthModalStack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
    <AuthModalStack.Screen options={{ headerShown: false }} name="StartSlide" component={StartSlideScreen} />
    <AuthModalStack.Screen name="AuthPages" options={{ headerShown: false }}>
      {() => (
        <AuthStack.Navigator>
          <AuthStack.Screen options={{ headerShown: false }} name="Welcome">
            {({ navigation }) => <WelcomeScreen signIn={signIn} navigation={navigation} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="SignIn">
            {({ navigation }) => <SignInScreen signIn={signIn} navigation={navigation} />}
          </AuthStack.Screen>
          <AuthStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
        </AuthStack.Navigator>
      )}
    </AuthModalStack.Screen>
    <AuthModalStack.Screen options={{ headerShown: false }} name="Confirmation" component={Confirmation} />
  </AuthModalStack.Navigator>
);

export default AuthNavigator;
