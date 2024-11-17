import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { WineCategories } from '../api/wineApi';

const categories = [
    { id: 'reds', name: 'Red Wines' },
    { id: 'whites', name: 'White Wines' },
    { id: 'sparkling', name: 'Sparkling Wines' },
    { id: 'rose', name: 'Rosé Wines' },
    { id: 'dessert', name: 'Dessert Wines' },
    { id: 'port', name: 'Port Wines' },
];

const HomeScreen = ({ navigation }) => {
    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('WineList', { category: item.id })}
        >
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
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
    categoryCard: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;