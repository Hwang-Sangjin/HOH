import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const {width, height} = Dimensions.get('window');

const CalendarScreen = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Calendar 
                style= {{
                    width: width,
                    height: height
                }}
            
                theme= {{
                    backgroundColor: '#ffffff'
                }}
            />

               

        </View>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});