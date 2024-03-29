import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const { width, height } = Dimensions.get('window');

const QRScanner = props => {

    const [scannedItem, setScannedItem] = useState('');

    const onSuccess = e => {
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
        setScannedItem(e.data);
    };

    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            reactivate={true}
            showMarker={true}
            // topContent={
            //     <Text style={styles.centerText}>
            //         Go to{' '}
            //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            //         your computer and scan the QR code.
            //     </Text>
            // }
            bottomContent={
                <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>{scannedItem}</Text>
                </TouchableOpacity>
            }
        />
    );

};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


export default QRScanner;
