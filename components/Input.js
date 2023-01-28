import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: '3%',
    padding: '3%',
    width: '85%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize:16
  },
});

const Input = ({ value, onChange, ...props }) => (
  <TextInput
    style={styles.input}
    onChangeText={onChange}
    value={value}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export default Input;
