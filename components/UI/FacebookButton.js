import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 5,
        backgroundColor: 'white',
        borderColor: Colors.secondary,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 15,
        color: Colors.secondary,
        fontWeight: '600',
        textAlign: 'center',
        width:'85%',
    },
    fbStyle: {
        height: 20,
        resizeMode: 'contain',
        width:'15%'
    }
});

const FacebookButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonStyle}
        >
            <Image
                style={styles.fbStyle}
                source={require('../../assets/images/facebook.png')}
            />
            <Text style={styles.textStyle}>
                Log in
            </Text>
        </TouchableOpacity>
    );
};

export default FacebookButton;
