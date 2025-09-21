import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type Props = {
    route: NativeStackScreenProps<RootStackParamList, 'RouteResults'>['route'];
    navigation: NativeStackScreenProps<RootStackParamList, 'RouteResults'>['navigation'];
}

type ResultItem = {
    busId: string;
    routeNumber: string;
    stopName: string;
    lat: number;
    lng: number;
    eta: string;
    distance: string;
};

const RouteResults: React.FC<Props> = ({ route, navigation }) => {
    const { routeNumber } = route.params;
    const [results, setResults] = useState<ResultItem[]>([]);

    useEffect(() => {
        if (!routeNumber) {
            console.warn('routeNumber is undefined');
            return;
        }

        console.log('Fetching data for route:', routeNumber);

        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.0.192:5000/api/buses/live/${routeNumber}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data);
                console.log('Fetched data:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [routeNumber]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#dceaf6" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Results for Route: {routeNumber}</Text>

                <View style={styles.card}>
                    {results.map((item) => (
                        <TouchableOpacity key={item.busId} style={styles.resultItem} onPress={() => navigation.navigate('BusTracking', { busId: item.busId, routeNumber: item.routeNumber })}>
                            <View style={styles.resultRow}>
                                <Text style={styles.busNumber}>{item.busId}</Text>
                                <Text style={styles.timing}>{item.eta}</Text>
                            </View>
                            <Text style={styles.routeText}>At {item.stopName}</Text>
                            <Text style={styles.routeText}>Distance to next Stop: {item.distance}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#dceaf6' },
    container: { flexGrow: 1, padding: 20, alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', color: '#2074d4', marginBottom: 20, textAlign: 'center' },
    card: {
        width: '100%',
        backgroundColor: '#f3f8fc',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    resultItem: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    busNumber: { fontSize: 16, fontWeight: 'bold', color: '#2363b5' },
    timing: { fontSize: 14, color: '#555' },
    routeText: { fontSize: 15, color: '#555' },
});

export default RouteResults;
