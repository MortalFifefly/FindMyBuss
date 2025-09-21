import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from "react";




type RouteSearchProps = {
    navigation: NativeStackNavigationProp<any, any>;
    route: NativeStackScreenProps<any, any>['route'];
};

const RouteIdSearch: React.FC<RouteSearchProps> = ({ navigation, route }) => {
    const [busId, setBusId] = useState('');
    const [routeNumber, setRouteNumber] = useState('');
    console.log(routeNumber);
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#dceaf6" />
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Search by Route or Bus ID</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Bus ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Bus ID"
                        placeholderTextColor="#666"
                        onChangeText={setBusId}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('BusTracking', { busId: busId, routeNumber: routeNumber }); console.log(busId); }}>
                        <Text style={styles.buttonText}>Search Bus</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Route Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Route Number"
                        placeholderTextColor="#666"
                        onChangeText={setRouteNumber}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('RouteResults', { routeNumber: routeNumber }); console.log("RouteNumber: ", routeNumber); }}>
                        <Text style={styles.buttonText}>Search Route</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#dceaf6',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#dceaf6',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2074d4',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#f3f8fc',
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2363b5',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#3695f2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#2074d4',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RouteIdSearch;
