import React, { useEffect } from 'react';
import {
    View,
    Animated,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import StartSlide from '../components/UI/StartSlide';
import Colors from '../constants/Colors';
import Auth from '@aws-amplify/auth';

const { width, height } = Dimensions.get('window');

const StartSlideScreen = props => {

    const intro = [
        {
            "ScreenNo": 1,
            "ImageUrl": "https://img.freepik.com/free-vector/hand-cartoon-person-holding-cell-phone-with-map-application_74855-19804.jpg?size=338&ext=jpg&ga=GA1.2.671229555.1654055793",
            "Title": "Find Nearest Event",
            "Description": "Lorem ipsum dolor sit amet, nam adhuc dolore in, at sea omnium tincidunt. Ius tale noster no, nam at primis eirmod. Delenit oporteat no eum."
        },
        {
            "ScreenNo": 2,
            "ImageUrl": "https://img.freepik.com/free-vector/online-chat-customer-bot-messenger-hand-holding-mobile-phone-with-messages-from-chatbot-screen-flat-vector-illustration-artificial-intelligence-users-support-service-concept_74855-21236.jpg?size=338&ext=jpg&ga=GA1.2.671229555.1654055793",
            "Title": "Chat With Friends",
            "Description": "Lorem ipsum dolor sit amet, nam adhuc dolore in, at sea omnium tincidunt. Ius tale noster no, nam at primis eirmod. Delenit oporteat no eum."
        },
        {
            "ScreenNo": 3,
            "ImageUrl": "https://img.freepik.com/free-vector/app-development-isometric-illustration-template_9209-2940.jpg?size=626&ext=jpg&ga=GA1.2.671229555.1654055793",
            "Title": "Manage Everything",
            "Description": "Lorem ipsum dolor sit amet, nam adhuc dolore in, at sea omnium tincidunt. Ius tale noster no, nam at primis eirmod. Delenit oporteat no eum."
        },
        {
            "ScreenNo": 4,
            "ImageUrl": "https://mobileapp.akazalms.lk/images/imagescreen4.PNG",
            "Title": "",
            "Description": ""
        }
    ];
    const SLIDER_DATA = [
        {
            key: '1',
            title: intro[0].Title,
            description: intro[0].Description,
            image: intro[0].ImageUrl
        },
        {
            key: '2',
            title: intro[1].Title,
            description: intro[1].Description,
            image: intro[1].ImageUrl
        },
        {
            key: '3',
            title: intro[2].Title,
            description: intro[2].Description,
            image: intro[2].ImageUrl
        },
    ];

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const keyExtractor = React.useCallback((_, index) => index.toString(), []);

    let flatListRef = React.useRef();
    const [activeIndex, setActiveIndex] = React.useState(null);
    const onViewRef = React.useRef(({ viewableItems }) => {
        setActiveIndex(viewableItems[0].index);
    });

    const gotoNextPage = () => {
        if (activeIndex + 1 < SLIDER_DATA.length) {
            flatListRef.current.scrollToIndex({
                index: activeIndex + 1,
                animated: true,
            });
        }
    };

    const isLast = () => {
        if (activeIndex == 2) {
            return true;
        }
        return false;
    };

    const NavigateHome = async () => {
        props.navigation.navigate('AuthPages');
    };

    return (
        <View style={styles.full}>
            <View>
                <FlatList
                    ref={flatListRef}
                    onViewableItemsChanged={onViewRef.current}
                    data={SLIDER_DATA}
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        },
                    )}
                    horizontal={true}
                    pagingEnabled
                    renderItem={itemData => (
                        <StartSlide
                            id={itemData.item.key}
                            image={itemData.item.image}
                            title={itemData.item.title}
                            description={itemData.item.description}
                        />
                    )}
                />
            </View>
            <View style={styles.dot}>
                <ExpandingDot
                    data={SLIDER_DATA}
                    expandingDotWidth={22}
                    scrollX={scrollX}
                    inActiveDotOpacity={0.6}
                    dotStyle={{
                        width: 8,
                        height: 6,
                        backgroundColor: '#175998',
                        borderRadius: 5,
                    }}
                    activeDotColor={'#175998'}
                    containerStyle={{
                        top: 0,
                    }}
                />
            </View>

            {!isLast() && (
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => gotoNextPage()}
                    activeOpacity={0.6}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>Next</Text>
                    </View>
                </TouchableOpacity>
            )}
            {isLast() && (
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => NavigateHome()}
                    activeOpacity={0.6}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>Let's Start</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        fontWeight: '600',
        backgroundColor: Colors.secondary,
        color: 'white',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        ...(Platform.OS === 'ios' && {
            lineHeight: height < 800 ? height * 0.07 : height * 0.06,
        }),
        ...(Platform.OS !== 'ios' && {
            height: height < 800 ? height * 0.07 : height * 0.06,
        }),
        fontStyle: 'normal',
        fontFamily: 'Poppins-SemiBold',
        fontSize: width > 600 ? 21 : 16,
        borderRadius: 8,
    },
    buttonContainer: {
        borderRadius: 8,
        overflow: 'hidden',
        ...(Platform.OS !== 'ios' && {
            height: height < 800 ? height * 0.126 : height * 0.122,
        }),
        width: width * 0.78,
    },
    dot: {
        height: height < 800 ? height * 0.074 : height * 0.078,
    },
    touch: {
        alignItems: 'center',
    },
    full: {
        backgroundColor: 'white',
        flex: 1,
    },
});

export default StartSlideScreen;
