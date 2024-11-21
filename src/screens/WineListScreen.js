import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import { fetchWines } from '../api/wineApi';
import LoadingSpinner from '../components/LoadingSpinner';
import WineCard from '../components/WineCard';

const WineListScreen = ({ route, navigation }) => {
    const [wines, setWines] = useState([]);
    const [filteredWines, setFilteredWines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        origin: '',
        minRating: 0,
        winery: ''
    });
    const { category } = route.params;

    useEffect(() => {
        loadWines();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filters, wines]);

    const loadWines = async () => {
        try {
            const wineData = await fetchWines(category);
            setWines(wineData);
            setFilteredWines(wineData);
        } catch (error) {
            console.error('Error loading wines:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = wines;

        // Text search filter
        if (searchQuery) {
            result = result.filter(wine =>
                wine.wine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                wine.winery.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Origin filter
        if (filters.origin) {
            result = result.filter(wine =>
                wine.location.toLowerCase().includes(filters.origin.toLowerCase())
            );
        }

        // Rating filter
        // Rating filter berdasarkan jumlah ulasan
        if (filters.minRating > 0) {
            result = result.filter(wine => {
                const reviewsCount = parseInt(wine.rating.reviews.replace(/\D+/g, ''), 10);
                return reviewsCount >= filters.minRating;
            });
        }


        // Winery filter
        if (filters.winery) {
            result = result.filter(wine =>
                wine.winery.toLowerCase().includes(filters.winery.toLowerCase())
            );
        }

        setFilteredWines(result);
    };

    const resetFilters = () => {
        setFilters({
            origin: '',
            minRating: 0,
            winery: ''
        });
        setSearchQuery('');
    };

    const renderFilterModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter Wines</Text>

                        {/* Origin Filter */}
                        <Text style={styles.filterLabel}>Origin</Text>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Enter country or region"
                            value={filters.origin}
                            onChangeText={(text) => setFilters(prev => ({...prev, origin: text}))}
                        />

                        {/* Rating Filter */}
                        <Text style={styles.filterLabel}>Minimum Reviews</Text>
                        <View style={styles.ratingContainer}>
                            {[10, 50, 100, 500].map((reviews) => (
                                <TouchableOpacity
                                    key={reviews}
                                    style={[
                                        styles.ratingButton,
                                        filters.minRating === reviews && styles.selectedRating
                                    ]}
                                    onPress={() => setFilters(prev => ({ ...prev, minRating: reviews }))}
                                >
                                    <Text style={styles.ratingText}>{reviews}+</Text>
                                </TouchableOpacity>
                            ))}
                        </View>


                        {/* Winery Filter */}
                        <Text style={styles.filterLabel}>Winery</Text>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Enter winery name"
                            value={filters.winery}
                            onChangeText={(text) => setFilters(prev => ({...prev, winery: text}))}
                        />

                        {/* Modal Buttons */}
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={resetFilters}
                            >
                                <Text style={styles.modalButtonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.applyButton]}
                                onPress={() => setFilterModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    if (loading) {
        return <LoadingSpinner message="Loading wines..." />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search wines..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    clearButtonMode="while-editing"
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterModalVisible(true)}
                >
                    <Text style={styles.filterButtonText}>Filters</Text>
                </TouchableOpacity>
            </View>

            {filteredWines.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No wines found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredWines}
                    renderItem={({ item }) => (
                        <WineCard
                            wine={item}
                            onPress={() => navigation.navigate('WineDetail', { wine: item })}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {renderFilterModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
    },
    filterButtonText: {
        color: '#333',
        fontWeight: 'bold',
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
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterLabel: {
        alignSelf: 'flex-start',
        marginTop: 10,
        fontWeight: 'bold',
    },
    filterInput: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    ratingButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        width: '18%',
        alignItems: 'center',
    },
    selectedRating: {
        backgroundColor: '#007bff',
    },
    ratingText: {
        color: '#333',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#007bff',
    },
    modalButtonText: {
        fontWeight: 'bold',
        color: '#333',
    },
});

export default WineListScreen;