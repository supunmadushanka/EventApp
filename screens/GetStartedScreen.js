import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GetStartedScreen = props => {

    return (
        <View>
            <View>
                <Text>Let's get started</Text>
                <Text>Sign up or Login</Text>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
});


export default GetStartedScreen;
