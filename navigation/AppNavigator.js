import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import QRScanner from '../screens/QRScanner';

const AppStack = createNativeStackNavigator();

const App = ({ signOut }) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {({ navigation }) => <Home signOut={signOut} navigation={navigation} />}
      </AppStack.Screen>
      <AppStack.Screen name="QRScanner" component={QRScanner} />
    </AppStack.Navigator>
  );
}

export default App;