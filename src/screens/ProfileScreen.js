import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleImagePress = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleImagePress}>
                    <Image
                        source={require('../../assets/app-logo.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <Text style={styles.appName}>Wines4You</Text>
                <Text style={styles.version}>Version 1.0.5</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>
                    Wines4You is your personal wine companion, designed to help you discover
                    and learn about different wines from around the world. Whether you're a
                    wine connoisseur or just beginning your wine journey, our app provides
                    detailed information about various wines, including reds, whites,
                    sparkling, rosé, dessert, and port wines.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featureList}>
                    <Text style={styles.featureItem}>• Browse different wine categories</Text>
                    <Text style={styles.featureItem}>• Detailed wine information</Text>
                    <Text style={styles.featureItem}>• Save your favorite wines</Text>
                    <Text style={styles.featureItem}>• View wine ratings and reviews</Text>
                    <Text style={styles.featureItem}>• Learn about wineries and regions</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Developer</Text>
                <Text style={styles.developerInfo}>
                    Created with ❤️ by Nicolaus Evan Widyatna
                </Text>
                <Text style={styles.contactInfo}>
                    Contact: nicolauswidyatna@students.undip.ac.id
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.copyright}>
                    © 2024 Wines4You. All rights reserved.
                </Text>
            </View>

            {/* Modal for showing image in big mode */}
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
                        source={require('../../assets/app-logo.png')}
                        style={styles.modalImage}
                        resizeMode="contain"
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5DC',
    },
    header: {
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#550000',
    },
    logo: {
        width: 100,
        height: 125,
        marginBottom: 5,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#FFD700',
    },
    version: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#090909',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    featureList: {
        marginTop: 8,
    },
    featureItem: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
        marginBottom: 8,
    },
    developerInfo: {
        fontSize: 16,
        marginBottom: 8,
    },
    contactInfo: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        padding: 24,
        alignItems: 'center',
    },
    copyright: {
        fontSize: 12,
        color: '#888',
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

export default ProfileScreen;
