import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/app-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.appName}>Wines4You</Text>
                <Text style={styles.version}>Version 1.0.3</Text>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    version: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
});

export default ProfileScreen;