import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddStudent from './src/AddStudent'
import MainScreen from './src/MainScreen'
import StudentInfo from './src/StudentInfo'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/AddStudent';


const Stack = createStackNavigator()

export default function App() {
  return (
    // <AccountRegister></AccountRegister>
    // <Login></Login>
    // <JobRegistion></JobRegistion>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddStudent" component={AddStudent} />
      <Stack.Screen name="StudentInfo" component={StudentInfo} />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
