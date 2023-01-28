import React from 'react';
import { Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: Colors.secondary,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  },
});

const Button = ({ onPress, children, backgroundColor }) => {
  const btnStyle = backgroundColor ? [styles.buttonStyle, { backgroundColor }] : styles.buttonStyle;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnStyle}
    >
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
