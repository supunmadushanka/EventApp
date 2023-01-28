import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center'
  },
});

const Home = ({ signOut, navigation }) => {

  const navigateSignup = () => {
    signOut();
  }

  const navigateQR = () => {
    navigation.navigate('QRScanner');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are now authenticated</Text>
      <Button onPress={navigateSignup}>Sign Out</Button>
      <Button onPress={navigateQR}>Scan QR</Button>
    </View>
  )
}

export default Home;
