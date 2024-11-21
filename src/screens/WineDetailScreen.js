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

                    <View style={styles.detailSection}>
                        <Text style={styles.labelText}>Winery</Text>
                        <Text style={styles.winery}>{wine.winery}</Text>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.labelText}>Origin</Text>
                        <Text style={styles.location}>{wine.location}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingLabel}>Rating</Text>
                            <Text style={styles.ratingText}>
                                {wine.rating.average} ★
                            </Text>
                        </View>
                        <View style={styles.reviewBadge}>
                            <Text style={styles.ratingLabel}>Reviews</Text>
                            <Text style={styles.reviewsText}>
                                {wine.rating.reviews}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.favoriteButtonCircular,
                            isFavorited ? styles.favoriteButtonActiveCircular : styles.favoriteButtonInactiveCircular,
                        ]}
                        onPress={handleFavoritePress}
                    >
                        <View style={styles.innerCircle}>
                            <Text style={styles.iconSymbol}>{isFavorited ? '♥' : '♡'}</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'top',
    },
    detailsWrapper: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
        color: '#2c3e50',
        marginBottom: 16,
    },
    detailSection: {
        marginBottom: 12,
    },
    labelText: {
        fontSize: 10,
        color: '#7f8c8d',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    winery: {
        fontSize: 16,
        color: '#34495e',
    },
    location: {
        fontSize: 16,
        color: '#2980b9',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    ratingBadge: {
        backgroundColor: '#ecf0f1',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 12,
        alignItems: 'center',
    },
    reviewBadge: {
        backgroundColor: '#ecf0f1',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 10,
        color: '#7f8c8d',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f39c12',
    },
    reviewsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    favoriteButtonCircular: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30, // Lingkaran
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    favoriteButtonInactiveCircular: {
        backgroundColor: '#c3c3ca', // Warna biru lembut untuk status belum favorit
    },
    favoriteButtonActiveCircular: {
        backgroundColor: '#FF6B6B', // Warna merah lembut untuk status favorit
    },
    innerCircle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSymbol: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Simbol tetap putih untuk kontras
    },


});

export default WineDetailScreen;