import React, { FC } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen: FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
});

export default LoadingScreen;
