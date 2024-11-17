import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getFavorites } from '../utils/storage';
import WineCard from '../components/WineCard';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
        // Add listener untuk refresh ketika screen fokus
        const unsubscribe = navigation.addListener('focus', loadFavorites);
        return unsubscribe;
    }, [navigation]);

    const loadFavorites = async () => {
        try {
            const savedFavorites = await getFavorites();
            setFavorites(savedFavorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <Text>Loading favorites...</Text>
            </View>
        );
    }

    if (favorites.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>No favorites yet</Text>
                <Text style={styles.subText}>Start adding wines to your favorites!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        color: '#666',
    },
});

export default FavoritesScreen;