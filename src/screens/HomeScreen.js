import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
    {
        id: 'reds',
        name: 'Red Wines',
        icon: '🍷',
        backgroundColor: '#720026'
    },
    {
        id: 'whites',
        name: 'White Wines',
        icon: '🥂',
        backgroundColor: '#F5D547'
    },
    {
        id: 'sparkling',
        name: 'Sparkling Wines',
        icon: '🍾',
        backgroundColor: '#C7D9B7'
    },
    {
        id: 'rose',
        name: 'Rosé Wines',
        icon: '🌸',
        backgroundColor: '#FFB6C1'
    },
    {
        id: 'dessert',
        name: 'Dessert Wines',
        icon: '🍯',
        backgroundColor: '#8B4513'
    },
    {
        id: 'port',
        name: 'Port Wines',
        icon: '🍇',
        backgroundColor: '#4B0082'
    },
];

const HomeScreen = ({ navigation }) => {
    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[styles.cardContainer, { backgroundColor: item.backgroundColor }]}
            onPress={() => navigation.navigate('WineList', { category: item.id })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Wine Adventure</Text>
                <Text style={styles.headerSubtitle}>Discover the Finest Wines</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2B48C',
    },
    headerContainer: {
        padding: 7,
        backgroundColor: '#550000', // Warna latar belakang header (maroon)
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        alignItems: 'center', // Memusatkan teks
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFD700', // Warna teks gold
        letterSpacing: 2, // Ruang antar huruf untuk efek elegan
        marginBottom: 5, // Spasi antara judul dan subjudul
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#FFF5E1', // Warna teks light beige
        fontStyle: 'italic',
        marginBottom: 10,
    },
    listContainer: {
        padding: 10,
        marginTop: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardContainer: {
        width: (width - 48) / 2,
        marginBottom: 16,
        borderRadius: 15,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIcon: {
        fontSize: 50,
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default HomeScreen;