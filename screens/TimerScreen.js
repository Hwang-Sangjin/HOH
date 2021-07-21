import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const TimerScreen = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text>Timer Screen</Text>
            <Button
                title = "Timer"
                onPress={() => navigation.navigate('ATimer')}
            />
            <Text>Counter Screen</Text>
            <Button
                title = "Counter"
                onPress={() => navigation.navigate('ACounter')}
            />
        </View>
    );
};

export default TimerScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323F4E'
    },
});