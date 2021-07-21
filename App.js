import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './navigation/tabs';
import AnimationTimer from './Timer/AnimationTimer.js';
import AnimationCounter from './Timer/AnimationCounter';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options = {{headerShown: false}}
        />
        <Stack.Screen 
          name="Timer" 
          component={AnimationTimer}
          options = {{headerShown: false}}
        />
        <Stack.Screen 
          name="ACounter" 
          component={AnimationCounter}
          options = {{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

