import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal
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
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState('nameAsc');
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
        applyFiltersAndSorting();
    }, [searchQuery, filters, sortOption, wines]);

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

    const applyFiltersAndSorting = () => {
        let result = [...wines];

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

        // Sorting
        result.sort((a, b) => {
            switch (sortOption) {
                case 'nameAsc':
                    return a.wine.localeCompare(b.wine);
                case 'nameDesc':
                    return b.wine.localeCompare(a.wine);
                case 'wineryAsc':
                    return a.winery.localeCompare(b.winery);
                case 'wineryDesc':
                    return b.winery.localeCompare(a.winery);
                default:
                    return 0;
            }
        });

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

    const renderSortModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={sortModalVisible}
                onRequestClose={() => setSortModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sort Wines</Text>

                        <TouchableOpacity
                            style={[
                                styles.sortOption,
                                sortOption === 'nameAsc' && styles.selectedSortOption
                            ]}
                            onPress={() => {
                                setSortOption('nameAsc');
                                setSortModalVisible(false);
                            }}
                        >
                            <Text style={styles.sortOptionText}>Wine Name (A-Z)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.sortOption,
                                sortOption === 'nameDesc' && styles.selectedSortOption
                            ]}
                            onPress={() => {
                                setSortOption('nameDesc');
                                setSortModalVisible(false);
                            }}
                        >
                            <Text style={styles.sortOptionText}>Wine Name (Z-A)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.sortOption,
                                sortOption === 'wineryAsc' && styles.selectedSortOption
                            ]}
                            onPress={() => {
                                setSortOption('wineryAsc');
                                setSortModalVisible(false);
                            }}
                        >
                            <Text style={styles.sortOptionText}>Winery (A-Z)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.sortOption,
                                sortOption === 'wineryDesc' && styles.selectedSortOption
                            ]}
                            onPress={() => {
                                setSortOption('wineryDesc');
                                setSortModalVisible(false);
                            }}
                        >
                            <Text style={styles.sortOptionText}>Winery (Z-A)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setSortModalVisible(false)}
                        >
                            <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
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
                        {/* Filters */}
                        <Text style={styles.filterLabel}>Origin</Text>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Enter country or region"
                            value={filters.origin}
                            onChangeText={(text) =>
                                setFilters(prev => ({ ...prev, origin: text }))
                            }
                        />
                        <Text style={styles.filterLabel}>Minimum Reviews</Text>
                        <View style={styles.ratingContainer}>
                            {[10, 50, 100, 500].map(reviews => (
                                <TouchableOpacity
                                    key={reviews}
                                    style={[
                                        styles.ratingButton,
                                        filters.minRating === reviews &&
                                        styles.selectedRating
                                    ]}
                                    onPress={() =>
                                        setFilters(prev => ({ ...prev, minRating: reviews }))
                                    }
                                >
                                    <Text style={styles.ratingText}>{reviews}+</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.filterLabel}>Winery</Text>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Enter winery name"
                            value={filters.winery}
                            onChangeText={(text) =>
                                setFilters(prev => ({ ...prev, winery: text }))
                            }
                        />
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
        return <LoadingSpinner message="sabar yaa..." />;
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
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterModalVisible(true)}
                >
                    <Text style={styles.filterButtonText}>Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setSortModalVisible(true)}
                >
                    <Text style={styles.sortButtonText}>Sort</Text>
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
                            onPress={() =>
                                navigation.navigate('WineDetail', { wine: item })
                            }
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            {renderFilterModal()}
            {renderSortModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2B48C',
    },
    detailsWrapper: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
    },
    filterButton: {
        backgroundColor: '#800000',
        padding: 12,
        borderRadius: 10,
    },
    filterButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#D2B48C',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#550000', // Close button color
        padding: 8,
        borderRadius: 50,
        zIndex: 1, // Ensures it appears above the modal content
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
        borderColor: '#550000',
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
        backgroundColor: '#550000',
        padding: 10,
        borderRadius: 10,
        width: '18%',
        alignItems: 'center',
    },
    selectedRating: {
        backgroundColor: '#FFD700',
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#FFF',
    },
    modalButtonText: {
        fontWeight: 'bold',
        color: '#333',
    },
    sortButton: {
        backgroundColor: '#800000',
        padding: 12,
        borderRadius: 10,
        marginLeft: 10,
    },
    sortButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    sortOption: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedSortOption: {
        backgroundColor: '#FFD700',
    },
    sortOptionText: {
        textAlign: 'center',
        fontSize: 16,
    },
    closeModalButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#550000',
        borderRadius: 10,
    },
    closeModalButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },

});

export default WineListScreen;