import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { fetchWines } from '../api/wineApi';
import LoadingSpinner from '../components/LoadingSpinner';
import WineCard from '../components/WineCard';

const WineListScreen = ({ route, navigation }) => {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = route.params;

    useEffect(() => {
        loadWines();
    }, []);

    const loadWines = async () => {
        try {
            const wineData = await fetchWines(category);
            setWines(wineData);
        } catch (error) {
            console.error('Error loading wines:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading wines..." />;
    }

    if (wines.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No wines found in this category</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={wines}
                renderItem={({ item }) => (
                    <WineCard
                        wine={item}
                        onPress={() => navigation.navigate('WineDetail', { wine: item })}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});

export default WineListScreen;