import React from 'react';
import {View, Text, Button, StyleSheet,Vibration,StatusBar, Easing, TextInput, Dimensions, Animated, TouchableOpacity, FlatList} from 'react-native';

const {width, height} = Dimensions.get('window');

const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#000000'
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) /2;

const AnimationTimer = ({navigation}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [duration,setDuration] = React.useState(timers[0]);
    const inputRef = React.useRef();
    const timerAnimation = React.useRef(new Animated.Value(height)).current;
    const textInputAnimation = React.useRef(new Animated.Value(timers[0])).current;
    const buttonAnimation = React.useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        const listener = textInputAnimation.addListener(({value}) => {
            inputRef?.current?.setNativeProps({
                text: Math.ceil(value).toString()
            })
        })

        return () =>{
            textInputAnimation.removeListener(listener);
            textInputAnimation.removeAllListeners();
        }
    })

    const animation = React.useCallback(() => {
        textInputAnimation.setValue(duration);

        Animated.sequence([
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),

            Animated.timing(timerAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),

            Animated.parallel([
                Animated.timing(textInputAnimation, {
                    toValue: 0,
                    duration: duration * 1000,
                    useNativeDriver: true
                }),
                Animated.timing(timerAnimation, {
                    toValue: height,
                    duration: duration * 1000,
                    useNativeDriver: true
                })
            ]),

            Animated.delay(400)
        ]).start(() =>{
            Vibration.cancel();
            Vibration.vibrate();
            textInputAnimation.setValue(duration);
            Animated.timing(buttonAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        })
    }, [duration])

    const opacity = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })
    const translateY = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    })
    const textOpacity = buttonAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [0,1]
    })


    return (
        <View style = {styles.container}>
            
            <StatusBar hidden/>

            <Animated.View
                style= {[StyleSheet.absoluteFillObject, {
                    height,
                    width,
                    backgroundColor: colors.red,
                    transform: [{
                        translateY: timerAnimation
                    }]
                }]}
            />


            <Animated.View
                style = {[
                    StyleSheet.absoluteFillObject,
                    {
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: 100,
                        transform: [{
                            translateY
                        }]
                    },
                ]}>
            
                <TouchableOpacity onPress = {animation}>
                    <View
                        style={styles.roundButton}
                    />
                </TouchableOpacity>
            </Animated.View>
            <View
                style= {{
                    position: 'absolute',
                    top: height/3,
                    left: 0,
                    right: 0,
                    flex: 1,
                }}>
                    <Animated.View style = {{
                        position: 'absolute',
                        width: ITEM_SIZE,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        opacity: textOpacity
                    }}>
                        <TextInput
                            ref = {inputRef}
                            style = {styles.text}
                            defaultValue= {duration.toString()}
                        />
                    </Animated.View>
                    <Animated.FlatList
                        data = {timers}
                        keyExtractor = {item => item.toString()}
                        horizontal
                        bounces = {false}
                        onScroll = {Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: true}
                        )}
                        onMomentumScrollEnd = {ev =>{
                            const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
                            setDuration(timers[index]);
                        }}
                        showsHorizontalScrollIndicator = {false}
                        snapToInterval = {ITEM_SIZE}
                        decelerationRate = 'fast'
                        style = {{flexGrow: 0, opacity}}
                        contentContainerStyle={{
                            paddingHorizontal: ITEM_SPACING
                        }}
                        renderItem = {({item,  index}) => {
                            const inputRange = [
                                (index -1) * ITEM_SIZE,
                                index * ITEM_SIZE,
                                (index +1) * ITEM_SIZE,
                            ]

                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [.4, 1, .4]
                            })
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [.7, 1, .7]
                            })
                            return <View style = {{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                                <Animated.Text style = {[styles.text, {
                                    opacity,
                                    transform: [{
                                        scale
                                    }]
                                }]}>
                                    {item}
                                </Animated.Text>
                            </View>
                        }}
                    />
            </View>
        </View>
    );
};

export default AnimationTimer;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black
    },
    roundButton:{
        alignItems: "center",
        backgroundColor: '#F76A6A',
        padding: 40,
        borderRadius: 100,
    },
    text:{
        flex: 1,
        fontSize: 100,
        color: '#ffffff',

    }
});