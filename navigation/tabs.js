import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimerScreen from '../screens/TimerScreen';
import SettingScreen from '../screens/SettingScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style:{
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...style.shadow
                }
            }}
        >
            <Tab.Screen 
                name = "History" 
                component={HistoryScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source = {require('../assets/icon/history.png')}
                                resizeMode = "contain"
                                style = {{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
                                HISTORY
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name = "Calendar" 
                component={CalendarScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source = {require('../assets/icon/calendar.png')}
                                resizeMode = "contain"
                                style = {{
                                    width: 28,
                                    height: 28,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
                                CALENDAR
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name = "Home"
                component = {HomeScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source = {require('../assets/icon/home.png')}
                                resizeMode = "contain"
                                style = {{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
                                HOME
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name = "Timer" 
                component={TimerScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source = {require('../assets/icon/timer.png')}
                                resizeMode = "contain"
                                style = {{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
                                TIMER
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name = "Setting" 
                component={SettingScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 3}}>
                            <Image
                                source = {require('../assets/icon/setting.png')}
                                resizeMode = "contain"
                                style = {{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style = {{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
                                SETTING
                            </Text>
                        </View>
                    )
                }}
            />
            
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width:0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;