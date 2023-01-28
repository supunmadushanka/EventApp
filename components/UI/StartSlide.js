import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const StartSlide = props => {

    const navigation = useNavigation();
    const NavigateOrg = async () => {
        navigation.navigate('AuthPages');
    }

    return (
        <View style={styles.product}>
            <View style={styles.skipContainer}>
                {props.id != 3 &&
                    <TouchableOpacity activeOpacity={0.6} onPress={NavigateOrg}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.imageContainer}>
                {props.id == 1 &&
                    <Image
                        source={{ uri: props.image }}
                        resizeMode={'contain'}
                        style={{
                            width: '82.12%',
                            height: '100%',
                        }}
                    />
                }
                {props.id == 2 &&
                    <Image
                        source={{ uri: props.image }}
                        resizeMode={'contain'}
                        style={{
                            width: '64.25%',
                            height: '100%',
                        }}
                    />
                }
                {props.id == 3 &&
                    <Image
                        source={{ uri: props.image }}
                        resizeMode={'contain'}
                        style={{
                            width: '82.12%',
                            height: '100%',
                        }}
                    />
                }
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text numberOfLines={4} style={styles.description}>{props.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        borderRadius: 10,
        backgroundColor: 'white',
        height: height * 0.8,
        width: width,
    },
    skipContainer: {
        height: height * 0.074,
        alignItems: 'flex-end',
        paddingRight: width * 0.08,
        paddingTop: height * 0.045,
    },
    skipText: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: width > 600 ? 21 : 16,
        color: 'rgba(158, 158, 158, 1)',
    },
    imageContainer: {
        width: '100%',
        height: height * 0.501,
        //marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        height: height * 0.08,
    },
    title: {
        fontSize: width > 600 ? 29 : 24,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 36,
        color: Colors.secondary,
        fontFamily: 'Poppins-SemiBold',
    },
    descriptionContainer: {
        ...(width < 376 && { paddingHorizontal: 12 }),
        alignItems: 'center',
        alignSelf: 'center',
        height: height * 0.145,
        width: width < 376 ? width * 0.98 : width * 0.8,
    },
    description: {
        // fontSize: width < 376 ? 14 : 16,
        fontSize: width > 600 ? 21 : 16,
        textAlign: 'center',
        lineHeight: 26,
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#424242',
        letterSpacing: -0.9
    },
});

export default StartSlide;
