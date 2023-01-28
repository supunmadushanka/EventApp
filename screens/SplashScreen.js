import React, { useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
} from 'react-native';

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('StartSlide');
        }, 3000);
    },[]);

    return (
        <ImageBackground
            source={require('../assets/images/Splash1.png')}
            style={styles.bgImage}
        >
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bgImage: {
        flex: 1
    },
});


export default SplashScreen;