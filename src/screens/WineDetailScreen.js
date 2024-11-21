import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import { saveFavorite, removeFavorite, isFavorite } from '../utils/storage';

const { width } = Dimensions.get('window');

const WineDetailScreen = ({ route }) => {
    const { wine } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        const favorited = await isFavorite(wine.id);
        setIsFavorited(favorited);
    };

    const handleFavoritePress = async () => {
        try {
            if (isFavorited) {
                await removeFavorite(wine.id);
                setIsFavorited(false);
            } else {
                await saveFavorite(wine);
                setIsFavorited(true);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update favorites');
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.detailsWrapper}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: wine.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.wineName}>{wine.wine}</Text>
                    <Text style={styles.winery}>{wine.winery}</Text>
                    <Text style={styles.location}>{wine.location}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>
                            Rating: {wine.rating.average} ★
                        </Text>
                        <Text style={styles.reviewsText}>
                            ({wine.rating.reviews})
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.favoriteButton,
                            isFavorited && styles.favoriteButtonActive
                        ]}
                        onPress={handleFavoritePress}
                    >
                        <Text style={styles.favoriteButtonText}>
                            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'top',
    },
    detailsWrapper: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    imageContainer: {
        width: '40%',
        aspectRatio: 0.75,
        marginRight: 16,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    wineName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    winery: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4,
    },
    location: {
        fontSize: 16,
        color: '#888',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    reviewsText: {
        fontSize: 16,
        color: '#666',
    },
    favoriteButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    favoriteButtonActive: {
        backgroundColor: '#FF3B30',
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WineDetailScreen;