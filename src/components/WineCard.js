import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Animated } from 'react-native';

const WineCard = ({ wine, onPress }) => {
    const [scale] = useState(new Animated.Value(1)); // Initial scale is 1

    // Function to trigger zoom-out effect
    const zoomOutImage = () => {
        Animated.timing(scale, {
            toValue: 0.9, // Scale the image to 80%
            duration: 300, // Duration of the animation
            useNativeDriver: true, // Use native driver for performance
        }).start();
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Animated.Image
                source={{ uri: wine.image }}
                style={[styles.image, { transform: [{ scale }] }]} // Apply animated scale
                resizeMode="contain"  // Prevent cropping, keep the entire image visible
                onLoad={zoomOutImage}  // Trigger the zoom-out effect when image loads
            />

            <View style={styles.content}>
                <Text style={styles.wineName} numberOfLines={2}>
                    {wine.wine}
                </Text>
                <View style={styles.detailContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Winery</Text>
                        <Text style={styles.winery} numberOfLines={1}>
                            {wine.winery}
                        </Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Origin</Text>
                        <Text style={styles.location} numberOfLines={1}>
                            {wine.location}
                        </Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingLabel}>Rating</Text>
                            <Text style={styles.rating}>
                                {wine.rating.average} ★
                            </Text>
                        </View>
                        <View style={styles.reviewBadge}>
                            <Text style={styles.ratingLabel}>Reviews</Text>
                            <Text style={styles.reviews}>
                                {wine.rating.reviews}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#F5F5DC',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 200,
        borderRadius: 8,
        marginRight: 12,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    wineName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#550000',
        marginBottom: 8,
    },
    detailContainer: {
        flex: 1,
    },
    labelContainer: {
        marginBottom: 6,
    },
    labelText: {
        fontSize: 10,
        color: '#7f8c8d',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    winery: {
        fontSize: 14,
        color: '#34495e',
    },
    location: {
        fontSize: 14,
        color: '#800009',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    ratingBadge: {
        backgroundColor: '#800000',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    reviewBadge: {
        backgroundColor: '#800000',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 10,
        color: '#F5F5DC',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    reviews: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFD700',
    },
});

export default WineCard;
