import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Animated, findNodeHandle, UIManager } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { io } from "socket.io-client";
import LoadingScreen from './Components/LoadingScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Define the expected props for this screen
type Props = NativeStackScreenProps<RootStackParamList, 'BusTracking'>;

// Define the structure of each bus result at a stop
type ResultItem = {
    _id: string;
    busId: string;
    routeNumber: string;
    stopName: string;
    nextStopName: string;
    lat: number;
    lng: number;
    isActive: boolean;
    lastUpdated: string;
    __v: number;
    routeName: string;
    eta: string;
    distance: string;
}

const BusTracking: React.FC<Props> = ({ route }) => {
    const { busId, routeNumber } = route.params;
    const [stopName, setStopName] = useState<string[]>([]);
    const [results, setResults] = useState<ResultItem | null>(null);
    const stopRef = useRef<View>(null);
    const targetRef = useRef<View>(null);
    const snapItem = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [ready, setReady] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        if (!busId) {
            console.warn('busId is undefined');
            return;
        }

        console.log('Fetching data for bus:', busId);
        console.log('Using route number:', routeNumber);

        const fetchData = async () => {
            try {
                console.log(routeNumber);
                const response = await fetch(`http://192.168.0.192:5000/api/route/${routeNumber}`);
                const data = await response.json();
                console.log(data);
                setStopName(data.stops.map((stop: any) => stop.name));
                console.log('Fetched stop data:', data.stops.map((stop: any) => stop.name));
            } catch (error) {
                console.error('Error fetching bus data:', error);
            }
        };

        fetchData();

        const socket = io("http://192.168.0.192:5000");

        socket.on("connect", () => {
            console.log("✅ Connected:", socket.id);

            // subscribe to a bus
            socket.emit("subscribeBus", busId);
            // listen for updates
            socket.on("bus:update", (data) => {
                console.log("📩 Bus update:", data);
                setResults(data);
            });
        });

        return () => {
            console.log("Disconnecting socket...");
            socket.disconnect();
        };
    }, [busId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#dceaf6" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Tracking Bus: {busId}</Text>

                <View style={styles.card}>
                    {results === null ? (
                        <LoadingScreen />
                    ) : (
                        <>  {ready && (
                            <Animated.View
                                style={{
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    transform: [{ translateX: snapItem.x }, { translateY: snapItem.y }],
                                    top: 75,
                                    right: 350,
                                }}
                            >
                                <Text style={{ fontSize: 14, width: 100, }}>ETA to Next Stop: {results.eta}</Text>
                                <MaterialCommunityIcons name="bus" size={30} color="#007bff" />
                            </Animated.View>
                        )}

                            <View style={{ height: 550, width: 5, left: 175, backgroundColor: '#abc0d8ff' }} />
                            <View style={{ flexDirection: 'column', position: 'absolute', top: 65, left: 50, width: '100%', height: "100%", gap: 117, alignItems: 'flex-end' }} ref={stopRef}>
                                {stopName.map((item) => {


                                    if (results !== null && results.stopName === item) {
                                        return (
                                            <View ref={targetRef} key={item} style={{ width: 150, height: 50 }} onLayout={(e) => {
                                                const { x, y } = e.nativeEvent.layout;
                                                if (!firstRender) {
                                                    snapItem.setValue({ x, y });
                                                    setFirstRender(true);
                                                    setReady(true);
                                                } else {
                                                    Animated.spring(snapItem, {
                                                        toValue: { x, y },
                                                        useNativeDriver: true,
                                                    }).start();
                                                    setReady(true);
                                                }

                                            }}>
                                                <View style={[styles.resultItem, { borderColor: '#0068b7ff', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }]}>
                                                    <Text style={styles.stopName}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </View>

                                        );
                                    } else {
                                        return (
                                            <View key={item} style={{ width: 150, height: 50 }}>
                                                <View style={[styles.resultItem, { justifyContent: 'center', alignItems: 'center' }]}>
                                                    <Text style={styles.stopName}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#dceaf6' },
    container: { flexGrow: 1, padding: 20, alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', color: '#2074d4', marginBottom: 20, textAlign: 'center', marginTop: 45 },
    card: {
        width: '100%',
        backgroundColor: '#f3f8fc',
        borderRadius: 12,
        padding: 65,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    resultItem: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        shadowColor: '#000',
        elevation: 2,
        justifyContent: 'center',
        width: 150,
        height: 50,
        marginBottom: 0,
    },
    resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    busId: { fontSize: 16, fontWeight: 'bold', color: '#2363b5' },
    eta: { fontSize: 14, color: '#555' },
    distance: { fontSize: 15, color: '#555' },
    noResults: { fontSize: 16, color: '#999', textAlign: 'center' },
    stopName: { fontSize: 16, color: '#555' },
    animatedView: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
});

export default BusTracking;
