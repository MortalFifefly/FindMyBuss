import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteSearchByStops from './app/RouteSearchByStops';
import Home from './app/Home';
import RouteSearchByBusId from './app/RouteSearchByBusId';
import RouteResults from './app/RouteResults';
import BusTracking from './app/BusTracking';


type RouteStackParamList = {
  Home: undefined;
  RouteSearchByStops: undefined;
  RouteSearchByBusId: undefined;
  RouteResults: { routeNumber: string };
  BusTracking: { busId: string, routeNumber: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = RouteStackParamList;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RouteSearchByStops" component={RouteSearchByStops} />
        <Stack.Screen name="RouteSearchByBusId" component={RouteSearchByBusId} />
        <Stack.Screen name="RouteResults" component={RouteResults} />
        <Stack.Screen name="BusTracking" component={BusTracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}