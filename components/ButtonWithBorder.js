import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: Colors.secondary,
    borderRadius: 20,
    borderWidth: 2,
  },
  textStyle: {
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});

const ButtonWithBorder = ({ onPress, children, backgroundColor }) => {
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

export default ButtonWithBorder;
