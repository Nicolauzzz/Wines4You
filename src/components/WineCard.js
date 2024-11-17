import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const WineCard = ({ wine, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: wine.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={styles.wineName}>{wine.wine}</Text>
                <Text style={styles.winery}>{wine.winery}</Text>
                <Text style={styles.location}>{wine.location}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{wine.rating.average} ★</Text>
                    <Text style={styles.reviews}>{wine.rating.reviews}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    wineName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    winery: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    location: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFD700',
        marginRight: 4,
    },
    reviews: {
        fontSize: 12,
        color: '#888',
    },
});

export default WineCard;