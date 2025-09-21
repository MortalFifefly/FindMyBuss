import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeProps = {
    navigation: NativeStackNavigationProp<any, any>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#dceaf6" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Bus Tracker</Text>

                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>
                        Welcome! Choose how you'd like to search for your bus information. You can search by Route or Bus ID, or find buses by Stops nearby.
                    </Text>
                </View>

                <View style={styles.card}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RouteSearchByBusId')}
                        style={[styles.cardButton, styles.cardButton1]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.cardButtonText}>Search by Route / Bus ID</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('RouteSearchByStops')}
                        style={[styles.cardButton, styles.cardButton2]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.cardButtonText}>Search by Stops</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Stay updated with live bus locations!</Text>
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
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2074d4',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#cee4fdff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#2074d4',
        textAlign: 'center',
    },
    card: {
        width: '100%',
    },
    cardButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardButton1: {
        backgroundColor: '#69a3e4',
    },
    cardButton2: {
        backgroundColor: '#2273cf',
    },
    cardButtonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#555555',
    },
});

export default Home;
