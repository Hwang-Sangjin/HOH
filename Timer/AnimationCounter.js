import React from 'react';
import {View, Text, Button, StyleSheet,Vibration,StatusBar, Easing, TextInput, Dimensions, Animated, TouchableOpacity, FlatList} from 'react-native';

const {width, height} = Dimensions.get('window');

const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#000000'
};

const counters = [...Array(7).keys()].map((i) => (i === 0 ? 1 : i * 5));
const term = [...Array(5).keys()].map((i) => (i === 0 ? 1 : i+1));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) /2;

const AnimationCounter = ({navigation}) => {
    const scrollXcounter = React.useRef(new Animated.Value(0)).current;
    const scrollXterm = React.useRef(new Animated.Value(0)).current;

    const [durationTerm, setDurationTerm] = React.useState(term[0]);
    const [durationCounter, setDurationCounter] = React.useState(counters[0]);
    const timerAnimation = React.useRef( new Animated.Value(height)).current;
    const buttonAnimation = React.useRef(new Animated.Value(0)).current;

    const animation = React.useCallback(() => {

        Animated.sequence([
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
        ]).start(() => {
            buttonAnimation.setValue(0);
        })

        Animated.sequence([// delay해야하는데 안된다
            Animated.delay(1000)
        ]).start()

        Animated.loop(
            Animated.sequence([
                Animated.timing(timerAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(timerAnimation, {
                    toValue: height,
                    duration: durationTerm * 1000,
                    useNativeDriver: true
                })
            ]),
            {
                iterations: durationCounter
            }
        ).start(() => {
            
        })

        
    },[durationCounter,durationTerm]);

    const opacity = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })
    const translateY = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    })


    return(
        <View style= {styles.container}>
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
                        opacity,
                        transform: [{
                            translateY
                        }]
                    },
                ]}>
                <TouchableOpacity
                    onPress={animation}>
                    <View
                        style= {styles.roundButton}
                    />
                </TouchableOpacity>
            </Animated.View>
            <View
                style = {{
                    position: 'absolute',
                    top: height /11,
                    left: 0,
                    right: 0,
                    flex: 1
                }}>
                <Text style = {styles.nameText}>Counter</Text>
                <Animated.FlatList
                    data = {counters}
                    keyExtractor = {item => item.toString()}
                    horizontal
                    bounces = {false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollXcounter}}}],
                        { useNativeDriver: true}
                    )}

                    onMomentumScrollEnd = {ev =>{
                        const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
                        setDurationCounter(counters[index]);
                    }}

                    showsHorizontalScrollIndicator = {false}
                    snapToInterval={ITEM_SIZE}
                    decelerationRate = 'fast'
                    style = {{flexGrow: 0}}
                    contentContainerStyle= {{
                        paddingHorizontal: ITEM_SPACING
                    }}
                    renderItem= {({item, index}) => {
                        const inputRange = [
                            (index-1) * ITEM_SIZE,
                            (index) * ITEM_SIZE,
                            (index+1) * ITEM_SIZE
                        ]
                        const opacity = scrollXcounter.interpolate({
                            inputRange,
                            outputRange: [.4, 1, .4]
                        })
                        const scale = scrollXcounter.interpolate({
                            inputRange,
                            outputRange: [.7, 1, .7]
                        })

                        return <Animated.View style = {{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                            <Animated.Text style = {[styles.text, {
                                opacity,
                                transform: [{
                                    scale
                                }]
                            }]}>
                                {item}
                            </Animated.Text>
                        </Animated.View>
                    }}>
                </Animated.FlatList>
            </View>

            <View
                style = {{
                    position: 'absolute',
                    top: height*3 / 9,
                    left: 0,
                    right: 0,
                    flex: 1
                }}>
                <Text style = {styles.nameText}>Term</Text>
                <Animated.FlatList
                    data = {term}
                    keyExtractor = {item => item.toString()}
                    horizontal
                    bounces = {false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollXterm}}}],
                        { useNativeDriver: true}
                    )}

                    onMomentumScrollEnd = {ev =>{
                        const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
                        setDurationTerm(term[index]);
                    }}

                    showsHorizontalScrollIndicator = {false}
                    snapToInterval={ITEM_SIZE}
                    decelerationRate = 'fast'
                    style = {{flexGrow: 0}}
                    contentContainerStyle= {{
                        paddingHorizontal: ITEM_SPACING
                    }}
                    renderItem= {({item, index}) => {
                        const inputRange = [
                            (index-1) * ITEM_SIZE,
                            (index) * ITEM_SIZE,
                            (index+1) * ITEM_SIZE
                        ]
                        const opacity = scrollXterm.interpolate({
                            inputRange,
                            outputRange: [.4, 1, .4]
                        })
                        const scale = scrollXterm.interpolate({
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
                    }}>
                </Animated.FlatList>
            </View>
        </View>
    );
};

export default AnimationCounter;

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
    },
    nameText:{
        flex: 0.3,
        fontSize: 50,
        color: '#ffffff',
    }
});