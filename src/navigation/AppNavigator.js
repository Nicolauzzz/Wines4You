import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import WineListScreen from '../screens/WineListScreen';
import WineDetailScreen from '../screens/WineDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// HomeStack untuk navigasi stack di tab "Home"
const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                title: 'Wines4You',
                headerStyle: { backgroundColor: '#550000' }, // Warna latar belakang header
                headerTintColor: '#F5F5DC', // Warna teks pada header
            }}
        />
        <Stack.Screen
            name="WineList"
            component={WineListScreen}
            options={({ route }) => ({
                title: route.params.category,
                headerStyle: { backgroundColor: '#550000' },
                headerTintColor: '#F5F5DC',
            })}
        />
        <Stack.Screen
            name="WineDetail"
            component={WineDetailScreen}
            options={{
                title: 'Wine Details',
                headerStyle: { backgroundColor: '#550000' },
                headerTintColor: '#F5F5DC',
            }}
        />
    </Stack.Navigator>
);

// Updated FavoritesStack to include WineDetail navigation
const FavoritesStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="FavoritesScreen"
            component={FavoritesScreen}
            options={{
                title: 'Wines4You',
                headerStyle: { backgroundColor: '#550000' },
                headerTintColor: '#F5F5DC',
            }}
        />
        <Stack.Screen
            name="WineDetail"
            component={WineDetailScreen}
            options={{
                title: 'Wine Details',
                headerStyle: { backgroundColor: '#550000' },
                headerTintColor: '#F5F5DC',
            }}
        />
    </Stack.Navigator>
);
const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
                title: 'Profile',
                headerStyle: { backgroundColor: '#550000' },
                headerTintColor: '#F5F5DC',
            }}
        />
    </Stack.Navigator>
);
const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FFD700', // Warna aktif menggunakan kode heksadesimal
                tabBarInactiveTintColor: '#FFF5E1', // Warna tidak aktif menggunakan kode heksadesimal
                tabBarStyle: { backgroundColor: '#550000' }, // Navbar dengan warna putih
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Favorites" component={FavoritesStack} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default AppNavigator;