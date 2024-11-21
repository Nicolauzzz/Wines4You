import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions, Modal
} from 'react-native';
import { saveFavorite, removeFavorite, isFavorite } from '../utils/storage';

const { width } = Dimensions.get('window');

const WineDetailScreen = ({ route }) => {
    const { wine } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

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
    const handleImagePress = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.detailsWrapper}>
                {/* Gambar dapat diklik */}
                <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
                    <Image
                        source={{ uri: wine.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Modal untuk gambar besar */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalBackground}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: wine.image }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                    </View>
                </Modal>


                {/* Tambahkan judul di tengah atas */}
                <Text style={styles.centeredWineName}>{wine.wine}</Text>

                <View style={styles.infoContainer}>
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
        backgroundColor: '#D2B48C',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'top',
    },
    detailsWrapper: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 16,
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
        marginTop: 80,
        marginRight: 16,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    centeredWineName: {
        position: 'absolute',
        top: '3%',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#550000',
        zIndex: 1,
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 16,
    },
    wineName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 16,
        textAlign: 'center',
    },
    detailSection: {
        marginBottom: 16,
    },
    labelText: {
        fontSize: 12,
        color: '#7f8c8d',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    winery: {
        fontSize: 18,
        color: '#34495e',
    },
    location: {
        fontSize: 18,
        color: '#800009',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    ratingBadge: {
        backgroundColor: '#800000',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 12,
        alignItems: 'center',
    },
    reviewBadge: {
        backgroundColor: '#800000',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 12, // Lebih proporsional
        color: '#F5F5DC',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    reviewsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    favoriteButtonCircular: {
        alignSelf: 'center', // Pusatkan tombol
        alignItems: 'center',
        justifyContent: 'center',
        width: 70, // Ukuran lebih besar
        height: 70,
        borderRadius: 35, // Pastikan berbentuk lingkaran
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    favoriteButtonInactiveCircular: {
        backgroundColor: '#9a9999',
    },
    favoriteButtonActiveCircular: {
        backgroundColor: '#FF6B6B',
    },
    innerCircle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSymbol: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: '70%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 30,
    },
});

export default WineDetailScreen;