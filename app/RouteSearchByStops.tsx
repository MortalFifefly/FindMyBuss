import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RouteSearchProps = {
    navigation: NativeStackNavigationProp<any, any>;
    route: NativeStackScreenProps<any, any>['route'];
};


const ROUTES = [
    { id: '1', name: 'Garia → Howrah' },
    { id: '2', name: 'Salt Lake → New Town' },
    { id: '3', name: 'Bidhannagar → Airport' },
    { id: '4', name: 'Esplanade → Behala' },
    { id: '5', name: 'Barasat → Park Street' },
];

const RouteSearch: React.FC<RouteSearchProps> = ({ navigation, route }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#dceaf6" />
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Search By Stops</Text>

                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder="From"
                        value={from}
                        onChangeText={setFrom}
                        placeholderTextColor="#666"
                    />

                    <View style={styles.inputRow}>
                        <View style={styles.separatorLine} />
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="swap-vertical" size={28} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="To"
                        value={to}
                        onChangeText={setTo}
                        placeholderTextColor="#666"
                    />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BusTracking', { busId: "BUS101", routeNumber: "101" })}>
                        <Text style={styles.buttonText}>Find Buses</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardRoute}>
                    <Text style={styles.sectionTitle}>Popular Routes</Text>
                    <View style={styles.separator} />
                    {ROUTES.map((route) => (
                        <TouchableOpacity key={route.id} style={styles.routeItem}>
                            <Text style={styles.routeText}>{route.name}</Text>
                        </TouchableOpacity>
                    ))}
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
        fontSize: 28,
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
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    separatorLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconButton: {
        marginLeft: 10,
        padding: 6,
    },
    button: {
        backgroundColor: '#3695f2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
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
    cardRoute: {
        width: '100%',
        backgroundColor: '#f3f8fc',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2363b5',
        textAlign: 'center',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
    routeItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    routeText: {
        fontSize: 16,
        color: '#555',
    },
});

export default RouteSearch;
